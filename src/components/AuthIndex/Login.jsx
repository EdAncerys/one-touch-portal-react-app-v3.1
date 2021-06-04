import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import OneTouchLogo from '../../img/oneTouch/One-Touch-Logo.png';

async function userLogin() {
  const URL = '/.netlify/functions/mongoDB';

  const loginEmail = document.querySelector('#loginEmail').value;
  const loginPassword = document.querySelector('#loginPassword').value;

  // if (loginEmail === '' || loginPassword === '') {
  //   console.log(`Please fill in all required fields`);
  //   return;
  // }

  const body = {
    oneTouchPath: 'oneTouchLogin',
    email: loginEmail,
    password: loginPassword,
  };
  console.log(body);

  const config = {
    method: 'POST',
    body: JSON.stringify(body),
  };

  try {
    const response = await fetch(URL, config);
    console.log(response);
    if (!response.ok) throw new Error(response.statusText);

    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}

export default function Login({ props }) {
  const { manageAppContext } = useContext(AppContext);

  return (
    <div className="features">
      <div className="flex-container-40">
        <img
          src={OneTouchLogo}
          height="60px"
          className="d-inline-block align-top"
          alt="One Touch Portal"
        />
        <div className="login-text-banner">
          <div>Welcome To One Touch Portal</div>
          <div>Create And Manage All Your Orders In One Place</div>
        </div>
      </div>
      <div className="flex-container-50">
        <Form className="form-container">
          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control
              id="loginEmail"
              type="email"
              placeholder="Enter email"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="loginPassword"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={() => userLogin()}
            variant="primary"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Log In
          </Button>
          <div className="divider"></div>
          <Button
            onClick={() => manageAppContext.setPage('create-new-account')}
            variant="success"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Create New Account
          </Button>
        </Form>
      </div>
    </div>
  );
}
