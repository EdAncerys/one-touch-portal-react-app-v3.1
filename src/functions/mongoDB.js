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

    default:
      return { statusCode: 400, msg: `Bad Request` };
  }
}

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
