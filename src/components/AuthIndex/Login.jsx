import React, { useContext } from 'react';
import { Form, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import OneTouchLogo from '../../img/oneTouch/One-Touch-Logo.png';
import ErrorMsg from '../ErrorMsg';

export default function Login({ props }) {
  const { manageAppContext } = useContext(AppContext);

  async function userLogin() {
    const loginEmail = document.querySelector('#loginEmail').value;
    const loginPassword = document.querySelector('#loginPassword').value;
    const URL = '/.netlify/functions/mongoDB';

    if (loginEmail === '' || loginPassword === '') {
      const msg = `Please fill in all required fields!`;
      manageAppContext.setAlert({ msg });
      console.log(msg);
      return;
    }

    try {
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
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        manageAppContext.setAlert({ msg: data.msg });
        console.log(data);
        return;
      }

      const access_token = { access_token: data.access_token, role: data.role };
      manageAppContext.setAccessToken(access_token);
      manageAppContext.setPage('index');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

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
