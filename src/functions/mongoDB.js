import fetch from 'node-fetch';

const MongoClient = require('mongodb').MongoClient;
let ObjectId = require('mongodb').ObjectID;
require('dotenv').config(); // Enabling to load Environment variables from a .env File

const nodemailer = require('nodemailer');

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server

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
  const loginUser = {
    email: data.email,
    password: data.password,
  };

  try {
    let passwordValid = false;
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find({ email: loginUser.email })
      .toArray();
    console.log('DB User:', user);

    if (user.length)
      passwordValid = await bcrypt.compare(
        loginUser.password,
        user[0].password
      );

    if (!user.length) {
      const msg = `User do not exist with email: ` + loginUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    if (user.length && !passwordValid) {
      const msg = `Email or password do not match for : ` + loginUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    // JWT configuration
    delete user[0]['password'];
    const userData = user[0];
    const expTime = '24h';
    console.log('User data passed on to JWT: ', userData);

    const access_token = jwt.sign(userData, ACCESS_TOKEN_SECRET, {
      expiresIn: expTime,
    });
    const role = ONE_TOUCH_ADMIN.includes(loginUser.email) ? 'admin' : false;
    const msg = `Welcome to One Touch Portal ` + loginUser.email;
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
  const signUpUser = {
    fName: data.fName,
    lName: data.lName,
    email: data.email,
    password: data.password,
    signUpConfirmPassword: data.signUpConfirmPassword,
  };

  try {
    let userValid = false;
    let passwordValid =
      signUpUser.password === signUpUser.signUpConfirmPassword;
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find({ email: signUpUser.email })
      .toArray();

    if (!passwordValid) {
      const msg =
        `Password do not match or not valid for email: ` + signUpUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }
    if (!!user.length) {
      const msg = `User already exist with email : ` + signUpUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(signUpUser.password, saltRounds);

    delete data.oneTouchPath;
    delete data.signUpConfirmPassword;
    data.password = hashedPassword;
    await db.collection(COLLECTION_ONE_TOUCH_SUPER_USER).insertMany([data]);
    const msg =
      `Account created successfully! Welcome to One Touch Portal ` +
      signUpUser.fName;
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
  const userAccount = {
    access_token: data.access_token,
  };

  try {
    const oneTouchUser = await authUser(userAccount.access_token);
    const superUserObjectId = new ObjectId(oneTouchUser._id);
    const user = await db
      .collection(COLLECTION_ONE_TOUCH_SUPER_USER)
      .find({ _id: superUserObjectId })
      .toArray();
    console.log('DB User:', user);

    if (!user.length) {
      const msg = `Failed to find user for: ` + oneTouchUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `User profile successfully loaded for: ` + oneTouchUser.email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ user, msg }),
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
  const userAccount = {
    access_token: data.access_token,
  };

  try {
    const oneTouchUser = await authUser(userAccount.access_token);
    const customerList = await db
      .collection(COLLECTION_ONE_TOUCH_CUSTOMER)
      .find({ 'oneTouchSuperUser.id': oneTouchUser._id })
      .toArray();
    console.log('DB customerList:', customerList);

    if (!customerList.length) {
      const msg = `Failed to find customers for: ` + oneTouchUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `User profiles successfully loaded for: ` + oneTouchUser.email;
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
  const userAccount = {
    access_token: data.access_token,
  };

  try {
    const oneTouchUser = await authUser(userAccount.access_token);
    const liveConnections = await db
      .collection(COLLECTION_ONE_TOUCH_BROADBAND)
      .find({ 'oneTouchSuperUser.id': oneTouchUser._id })
      .toArray();
    console.log('DB liveConnections:', liveConnections);

    if (!liveConnections.length) {
      const msg = `Failed to find contracts for: ` + oneTouchUser.email;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `Contracts successfully loaded for: ` + oneTouchUser.email;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ liveConnections, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
