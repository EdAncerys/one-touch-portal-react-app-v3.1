import fetch from 'node-fetch';

const jwt = require('jsonwebtoken');

// freshDesk credentials
const FD_API_KEY = process.env.FD_API_KEY;
const FD_ENDPOINT = process.env.FD_ENDPOINT;
const ENCODING_METHOD = 'base64';
const AUTHORIZATION_KEY =
  'Basic ' + new Buffer.from(FD_API_KEY + ':' + 'X').toString(ENCODING_METHOD);

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event);

  let body = null;
  if (event.body) body = JSON.parse(event.body);
  let path = null;
  if (body) path = body.oneTouchPath;
  console.log(`Function Path: ` + path);

  switch (path) {
    case 'freshDeskTickets':
      return freshDeskTickets(body);

    default:
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: `Lambda not found. Bad Request` }),
      };
  }
}

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
const freshDeskTickets = async (data) => {
  let PATH = `api/v2/tickets`;
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;

  const access_token = data.access_token;
  console.log(`auth token `, access_token);
  const oneTouchUser = await authUser(access_token);
  const name = oneTouchUser.oneTouchSuperUser.fName;

  const headers = {
    Authorization: AUTHORIZATION_KEY,
    'Content-Type': 'application/json',
  };
  const config = {
    headers,
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();

    if (!response.ok) {
      const msg = `Error. Failed to fetch tickets for: ` + name;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `Successfully fetched help desk tickets for: ` + name;
    const freshDeskTickets = data;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ freshDeskTickets, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
