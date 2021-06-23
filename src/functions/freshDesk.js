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
    case 'findTicket':
      return findTicket(body);
    case 'raiseTicket':
      return raiseTicket(body);

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
const findTicket = async (data) => {
  const id = data.id;
  const access_token = data.access_token;

  const PATH = `api/v2/tickets/${id}`;
  const CONVERSATION_PATH = `api/v2/tickets/${id}/conversations`;
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;
  const CONVERSATION_URL = `https://${FD_ENDPOINT}.freshdesk.com/${CONVERSATION_PATH}`;

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
    const conversation_response = await fetch(CONVERSATION_URL, config);
    const ticket = await Promise.all([
      response.json(),
      conversation_response.json(),
    ]);

    if (!response.ok || !conversation_response.ok) {
      const msg = `Error. Failed to fetch ticket for: ` + name;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `Successfully fetched help desk ticket for: ` + name;
    console.log(msg);

    return {
      statusCode: 200,
      body: JSON.stringify({ ticket, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
const raiseTicket = async (data) => {
  let PATH = `api/v2/tickets`;
  const URL = `https://${FD_ENDPOINT}.freshdesk.com/${PATH}`;

  const access_token = data.access_token;
  const oneTouchUser = await authUser(access_token);
  const name = oneTouchUser.oneTouchSuperUser.fName;

  const reason = JSON.stringify(data.reason);
  const priority = data.priority;
  const subject = JSON.stringify(data.subject);
  const description = JSON.stringify(data.description);
  const tags = JSON.stringify(['oneTouch Portal']);
  const email = JSON.stringify(oneTouchUser.oneTouchSuperUser.email);
  const cc_emails = JSON.stringify([
    oneTouchUser.oneTouchSuperUser.email,
    'user@cc.com',
  ]);

  const ticket = `{ 
                    "subject": ${subject},
                    "description": ${description},
                    "email": ${email},
                    "priority": ${priority},
                    "status": 2,
                    "tags": ${tags},
                    "cc_emails": ${cc_emails}
                  }`;

  const headers = {
    Authorization: AUTHORIZATION_KEY,
    'Content-Type': 'application/json',
  };
  const config = {
    method: 'POST',
    body: ticket,
    headers,
  };

  try {
    const response = await fetch(URL, config);
    const data = await response.json();

    if (!response.ok) {
      const msg = `Error. Failed to raise tickets for: ` + name;
      console.log(msg);
      return {
        statusCode: 403,
        body: JSON.stringify({ data, msg }),
      };
    }

    const msg = `Successfully raised ticket for: ` + name + ` ${subject}`;
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
