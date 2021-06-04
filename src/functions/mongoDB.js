export function handler(event, context, callback) {
  context.callbackWaitsForEmptyEventLoop = false;

  // const db = await connectToDatabase(MONGODB_URI);

  let body = null;
  if (event.body) body = JSON.parse(event.body);
  let path = null;
  if (body) path = body.oneTouchPath;
  console.log(`Function Path: ` + path);

  switch (path) {
    case 'oneTouchLogin':
      return oneTouchLogin(body);
    case 'oneTouchSignUp':
      return oneTouchSignUp(body);

    default:
      return callback(null, {
        statusCode: 400,
        body: JSON.stringify({ msg: 'Netlify Lambda. URL Path Not Found!' }),
      });
  }
}

const oneTouchLogin = async (data) => {
  return {
    statusCode: 200,
    body: JSON.stringify({ msg: 'User login!' }),
  };
};
