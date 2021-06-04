export function handler(event, context, callback) {
  console.log(`testing lambda function`);

  callback(null, {
    statusCode: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true,
    },
    body: JSON.stringify({ msg: 'Hello, World!' }),
  });
}
