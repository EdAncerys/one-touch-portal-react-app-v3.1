import fetch from 'node-fetch';

const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

// const nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const MONGO_DB_ENVIRONMENT = process.env.MONGO_DB_ENVIRONMENT;
const MONGODB_URI_DEV = process.env.MONGODB_URI_DEV;
let MONGODB_URI = process.env.MONGODB_URI;
if (MONGO_DB_ENVIRONMENT === 'development') MONGODB_URI = MONGODB_URI_DEV;
console.table(`DB connection URI: ` + MONGODB_URI);

const DB_NAME = 'oneTouchDB';
const ONE_TOUCH_ADMIN = process.env.ONE_TOUCH_ADMIN;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;
const COLLECTION_ONE_TOUCH_BROADBAND = 'oneTouchBroadband';
const COLLECTION_ONE_TOUCH_SUPER_USER = 'oneTouchSuperUser';
const COLLECTION_ONE_TOUCH_CUSTOMER = 'oneTouchCustomer';

let cachedDb = null;
const connectToDatabase = async (uri) => {
  if (cachedDb) return cachedDb;

  const client = await MongoClient.connect(uri, {
    useUnifiedTopology: true,
  });

  cachedDb = client.db(DB_NAME);

  return cachedDb;
};

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  const db = await connectToDatabase(MONGODB_URI);

  let body = null;
  if (event.body) body = JSON.parse(event.body);
  let path = null;
  if (body) path = body.oneTouchPath;
  console.log(`Function Path: ` + path);

  switch (path) {
    case 'oneTouchLogin':
      return oneTouchLogin(db, body);
    case 'oneTouchSignUp':
      return oneTouchSignUp(db, body);
    case 'myAccount':
      return myAccount(db, body);
    case 'userManagement':
      return userManagement(db, body);
    case 'liveConnections':
      return liveConnections(db, body);
    case 'fetchAddress':
      return fetchAddress(db, body);
    case 'addCustomerToDB':
      return addCustomerToDB(db, body);
    case 'deleteCustomer':
      return deleteCustomer(db, body);
    case 'deleteContract':
      return deleteContract(db, body);
    case 'activateContract':
      return activateContract(db, body);
    case 'placeBroadbandOrder':
      return placeBroadbandOrder(db, body);
    case 'updateMyAccount':
      return updateMyAccount(db, body);
    case 'updateUserAccount':
      return updateUserAccount(db, body);
    case 'updateAccountStatus':
      return updateAccountStatus(db, body);
    case 'deleteUserAccount':
      return deleteUserAccount(db, body);
    case 'portalUsers':
      return portalUsers(db, body);

    default:
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: `Lambda not found. Bad Request` }),
      };
  }
}

// const superUserObjectId = new ObjectId(oneTouchUser._id);

const authUser = async (access_token) => {
  const authToken = await jwt.verify(
    access_token,
    ACCESS_TOKEN_SECRET,
    (error, authData) => {
      if (error) {
        console.log(error);
        return false;
      } else {
        console.log(authData);
        return authData;
      }
    }
  );
  return authToken;
};
const oneTouchLogin = async (db, data) => {
  const email = data.email;
  const password = data.password;

  const query = {
    'oneTouchSuperUser.email': email,
  };

  try {
    let passwordValid = false;
    let userApproved = false;
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB User:', user);

    if (!!user.length) userApproved = user[0].oneTouchSuperUser.userApproved;
    if (!!user.length)
      passwordValid = await bcrypt.compare(
        password,
        user[0].oneTouchSuperUser.password
      );

    if (!user.length) {
      const msg = `User do not exist with email: ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    if (!userApproved) {
      const msg = `Account not yet approved for: ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    if (user.length && !passwordValid) {
      const msg = `Email or password do not match for : ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    // JWT configuration
    delete user[0].oneTouchSuperUser.password;
    const userData = user[0];
    const expTime = '24h';
    console.log('User data passed on to JWT: ', userData);

    const access_token = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
      expiresIn: expTime,
    });
    let role = false;
    if (ONE_TOUCH_ADMIN.includes(email)) role = 'admin';
    if (email === 'lookatemail@gmail.com') role = 'dev';

    const msg = `Welcome to One Touch Portal ` + email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ access_token, role, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const oneTouchSignUp = async (db, data) => {
  const fName = data.fName;
  const email = data.email;
  const password = data.password;
  const signUpConfirmPassword = data.signUpConfirmPassword;

  const query = {
    'oneTouchSuperUser.email': email,
  };

  try {
    let userValid = false;
    let passwordValid = password === signUpConfirmPassword;
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();

    if (!passwordValid) {
      const msg = `Password do not match or not valid for email: ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    if (!!user.length) {
      const msg = `User already exist with email : ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    let userApproved = false;
    if (ONE_TOUCH_ADMIN.includes(email)) userApproved = true;

    delete data.oneTouchPath;
    delete data.signUpConfirmPassword;
    data.password = hashedPassword;
    data.userApproved = userApproved;

    const oneTouchSuperUser = { oneTouchSuperUser: data };

    await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .insertMany([oneTouchSuperUser]);
    const msg =
      `Account created successfully! Welcome to One Touch Portal ` + fName;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const myAccount = async (db, data) => {
  const access_token = data.access_token;

  try {
    const oneTouchUser = await authUser(access_token);
    const superUserObjectId = new ObjectId(oneTouchUser._id);
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find({ _id: superUserObjectId })
      .toArray();
    console.log('DB User:', user);

    if (!user.length) {
      const msg = `Failed to find user.`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const oneTouchSuperUser = user;
    delete oneTouchSuperUser[0].oneTouchSuperUser.password;
    delete oneTouchSuperUser[0].oneTouchSuperUser.userApproved;

    const msg =
      `User profile successfully loaded for: ` + oneTouchSuperUser.email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ oneTouchSuperUser, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const userManagement = async (db, data) => {
  const access_token = data.access_token;
  const role = data.role;

  try {
    const oneTouchUser = await authUser(access_token);
    const admin = role;
    let findByID = { 'oneTouchSuperUser.id': oneTouchUser._id };
    if (admin) findByID = {};

    const customerList = await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .find(findByID)
      .toArray();
    console.log('DB customerList:', customerList);

    if (!customerList.length) {
      const msg =
        `No customers found for: ` + oneTouchUser.oneTouchSuperUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg =
      `User profiles successfully loaded for: ` +
      oneTouchUser.oneTouchSuperUser.email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ customerList, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const liveConnections = async (db, data) => {
  const access_token = data.access_token;
  const role = data.role;

  try {
    const oneTouchUser = await authUser(access_token);
    const admin = role;
    let findByID = { 'oneTouchSuperUser.id': oneTouchUser._id };
    if (admin) findByID = {};

    let liveConnections = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find(findByID)
      .toArray();
    console.log('DB liveConnections:', liveConnections);

    if (!liveConnections.length) {
      const msg =
        `No contracts found for: ` + oneTouchUser.oneTouchSuperUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const liveConnectionsPromises = liveConnections.map(async (customer) => {
      console.log(customer);
      const customerId = customer.oneTouchCustomer.id;
      const customerObjectId = new ObjectId(customerId);

      // fetching customer object from db
      const customerPromise = await db
        .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
        .find({ _id: customerObjectId })
        .toArray();
      let oneTouchCustomerData = customerPromise;
      if (!!oneTouchCustomerData.length)
        oneTouchCustomerData = customerPromise[0].oneTouchCustomer;
      customer['oneTouchCustomer'] = oneTouchCustomerData;

      return customer;
    });
    const contracts = await Promise.all(liveConnectionsPromises);
    console.log('eddited contract data');
    console.log(contracts);
    const msg =
      `Contracts successfully loaded for: ` +
      oneTouchUser.oneTouchSuperUser.email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ contracts, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const addCustomerToDB = async (db, data) => {
  const access_token = data.access_token;
  const email = data.email;

  try {
    const oneTouchUser = await authUser(access_token);
    let query = {
      'oneTouchSuperUser.id': oneTouchUser._id,
      'oneTouchCustomer.email': email,
    };

    let customer = await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .find(query)
      .toArray();
    console.log('DB customer:', customer);

    if (!!customer.length) {
      const msg = `Customer already exists with email: ` + email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    delete data.oneTouchPath;
    delete data.access_token;

    const oneTouchCustomer = {
      oneTouchSuperUser: { id: oneTouchUser._id },
      oneTouchCustomer: data,
    };

    await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .insertMany([oneTouchCustomer]);
    const msg = `Customer successfully added with email: ` + email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ data, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const deleteCustomer = async (db, data) => {
  const id = data.id;
  const objectID = new ObjectId(id);

  try {
    const findCustomer = { _id: objectID };
    const findContract = { 'oneTouchCustomer.id': id };

    let customer = await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .find(findCustomer)
      .toArray();
    console.log('DB customer:', customer);

    let liveConnections = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find(findContract)
      .toArray();
    console.log('DB liveConnections:', liveConnections);

    if (!!customer.length && !!liveConnections.length) {
      const msg = `Customer associated with contract. Delete contract first!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    delete data.oneTouchPath;
    delete data.access_token;
    delete data.id;

    await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .deleteOne({ _id: objectID });
    const msg = `Customer successfully deleted!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ data, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const deleteContract = async (db, data) => {
  const id = data.id;
  const objectID = new ObjectId(id);

  try {
    const findContract = { _id: objectID };

    let liveConnections = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find(findContract)
      .toArray();
    console.log('DB liveConnections:', liveConnections);

    if (!liveConnections.length) {
      const msg = `Error. Could not delete the contract!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    delete data.oneTouchPath;
    delete data.access_token;
    delete data.id;

    await db.collection(COLLECTION_ONE_TOUCH_BROADBAND).deleteOne(findContract);
    const msg = `Contract successfully deleted!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ data, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const activateContract = async (db, data) => {
  const contract = data.contract.oneTouchBroadband;
  const id = data.id;
  const objectID = new ObjectId(id);

  try {
    const query = { _id: objectID };
    const update = {
      $set: { oneTouchBroadband: contract },
    };
    const options = { upsert: true };

    let liveConnections = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find(query)
      .toArray();
    console.log('DB liveConnections:', liveConnections);

    if (!liveConnections.length) {
      const msg = `Error. Could not activate the contract!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    delete data.oneTouchPath;
    delete data.access_token;
    delete data.id;

    await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .updateOne(query, update, options);
    const msg = `Contract successfully activated!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ data, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const placeBroadbandOrder = async (db, data) => {
  const access_token = data.access_token;
  const selectedBroadband = data.oneTouchBroadband;
  const oneTouchCustomer = data.oneTouchCustomer;

  try {
    const oneTouchUser = await authUser(access_token);
    let findBroadband = {
      'oneTouchSuperUser.id': oneTouchUser._id,
      'oneTouchCustomer.id': oneTouchCustomer.id,
    };

    let broadband = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find(findBroadband)
      .toArray();
    console.log('DB broadband:', broadband);

    if (!!broadband.length) {
      const msg = `Broadband already been placed for this customer.`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const oneTouchBroadband = {
      oneTouchSuperUser: { id: oneTouchUser._id },
      oneTouchCustomer,
      oneTouchBroadband: selectedBroadband,
    };

    await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .insertMany([oneTouchBroadband]);
    const msg = `Broadband order successfully placed.`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ data, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const updateMyAccount = async (db, data) => {
  const access_token = data.access_token;

  try {
    const oneTouchUser = await authUser(access_token);
    const id = oneTouchUser._id;
    const objectID = new ObjectId(id);

    const query = { _id: objectID };
    const options = { upsert: true };

    let superUser = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB superUser:', superUser);

    if (!superUser.length) {
      const msg = `Error. Could not update account details!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    delete data.oneTouchPath;
    delete data.access_token;
    data.userApproved = superUser[0].oneTouchSuperUser.userApproved;
    data.password = superUser[0].oneTouchSuperUser.password;
    const update = {
      $set: { oneTouchSuperUser: data },
    };

    await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .updateOne(query, update, options);
    const msg = `Account details successfully updated!`;
    console.log(msg);

    superUser[0].oneTouchSuperUser = data;

    return {
      statusCode: 200,
      body: JSON.stringify({ superUser, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const updateUserAccount = async (db, data) => {
  const id = data.id;

  try {
    const objectID = new ObjectId(id);

    const query = { _id: objectID };
    const options = { upsert: true };

    let superUser = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB superUser:', superUser);

    if (!superUser.length) {
      const msg = `Error. Could not update account details!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    delete data.oneTouchPath;
    delete data.userId;
    data.userApproved = superUser[0].oneTouchSuperUser.userApproved;
    data.password = superUser[0].oneTouchSuperUser.password;
    const update = {
      $set: { oneTouchSuperUser: data },
    };

    await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .updateOne(query, update, options);
    const msg = `Account details successfully updated!`;
    console.log(msg);

    superUser[0].oneTouchSuperUser = data;

    return {
      statusCode: 200,
      body: JSON.stringify({ superUser, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const updateAccountStatus = async (db, data) => {
  const id = data.id;
  const userApproved = data.userApproved;

  try {
    const objectID = new ObjectId(id);

    const query = { _id: objectID };
    const options = { upsert: true };

    let superUser = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB superUser:', superUser);

    if (!superUser.length) {
      const msg = `Error. Could not update account details!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    superUser[0].oneTouchSuperUser.userApproved = userApproved;
    const updateUser = superUser[0].oneTouchSuperUser;
    const update = {
      $set: { oneTouchSuperUser: updateUser },
    };
    console.log(superUser);

    await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .updateOne(query, update, options);
    const msg = `Account details successfully updated!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ superUser, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const portalUsers = async (db, data) => {
  const access_token = data.access_token;

  try {
    const oneTouchUser = await authUser(access_token);
    const id = oneTouchUser._id;
    const objectID = new ObjectId(id);

    const query = { _id: { $ne: objectID } };
    const options = { upsert: true };

    let superUser = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB superUser:', superUser);

    if (!superUser.length) {
      const msg = `Error. Could not fetch user account details!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    superUser.map((user) => {
      delete user.oneTouchSuperUser.password;
      return user;
    });
    const msg = `Account details successfully loaded!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ superUser, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const deleteUserAccount = async (db, data) => {
  const id = data.id;

  try {
    const objectID = new ObjectId(id);

    const query = { _id: objectID };
    const options = { upsert: true };

    let superUser = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find(query)
      .toArray();
    console.log('DB superUser:', superUser);

    if (!superUser.length) {
      const msg = `Error. Could not delete user account!`;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    await db.collection(COLLECTION_ONE_TOUCH_SUPER_USER).deleteOne(query);
    const msg = `User account successfully deleted!`;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
