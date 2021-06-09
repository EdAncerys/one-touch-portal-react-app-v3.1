import fetch from 'node-fetch';
const sha512 = require('js-sha512'); // component to compute the SHA512
const HttpsProxyAgent = require('https-proxy-agent'); // Proxy server
// Proxy Server Agent configuration
const QUOTAGUARD_STATIC_URL = process.env.QUOTAGUARD_STATIC_URL;
const proxyAgent = new HttpsProxyAgent(QUOTAGUARD_STATIC_URL);
// icUK configuration
const ICUK_USER = process.env.ICUK_USER;
const ICUK_URL = process.env.ICUK_URL;
const ICUK_API_KEY = process.env.ICUK_API_KEY;

export async function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;
  console.log(event);

  let body = null;
  if (event.body) body = JSON.parse(event.body);
  let path = null;
  if (body) path = body.oneTouchPath;
  console.log(`Function Path: ` + path);

  switch (path) {
    case 'fetchAddress':
      return fetchAddress(body);
    case 'addressesForPostcodeProvided':
      return addressesForPostcodeProvided(body);

    default:
      return {
        statusCode: 500,
        body: JSON.stringify({ msg: `Lambda not found. Bad Request` }),
      };
  }
}

const fetchAddress = async (data) => {
  console.log('QuatAGuard Proxy Server Agent');
  const postcode = data.postcode;
  console.log(postcode);

  const ICUK_END_POINT = '/broadband/address_search/';
  const HASH = sha512(ICUK_END_POINT + postcode + ICUK_API_KEY);
  const URL = ICUK_URL + ICUK_END_POINT + postcode;

  const headers = {
    User: ICUK_USER,
    Hash: HASH,
    Encryption: 'SHA-512',
    'Content-Type': 'application/json',
  };
  const config = {
    headers,
    agent: proxyAgent,
    timeout: 10000,
    followRedirect: true,
    maxRedirects: 10,
  };
  console.log(config);

  try {
    const response = await fetch(URL, config);
    const data = await response.json();

    if (!response.ok) {
      const msg = `No addresses been found for: ` + postcode;
      console.log(msg);

      return {
        statusCode: 400,
        body: JSON.stringify({ msg }),
      };
    }

    const msg = `Addresses successfully fetched for: ` + postcode;
    console.log(msg);
    const addresses = data.addresses;

    return {
      statusCode: 200,
      body: JSON.stringify({ addresses, msg }),
    };
  } catch (err) {
    console.log(err);
    return {
      statusCode: 500,
      body: JSON.stringify({ msg: err.message }),
    };
  }
};
