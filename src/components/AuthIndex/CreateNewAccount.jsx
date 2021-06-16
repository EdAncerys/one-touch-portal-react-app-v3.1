import React, { useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import { validateEmail } from './validateEmail';

export default function CreateNewAccount({ props }) {
  const { manageAppContext } = useContext(AppContext);

  const setSpinner = manageAppContext.setSpinner;

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'Enter' || event.code === 'NumpadEnter') {
        event.preventDefault();
        oneTouchSignUp();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  async function oneTouchSignUp() {
    setSpinner(true);
    const fName = document.querySelector('#fName').value;
    const lName = document.querySelector('#lName').value;
    const companyName = document.querySelector('#companyName').value;
    const companyPhoneNumber = document.querySelector(
      '#companyPhoneNumber'
    ).value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const signUpConfirmPassword = document.querySelector(
      '#signUpConfirmPassword'
    ).value;

    const URL = '/.netlify/functions/mongoDB';
    if (
      !fName ||
      !lName ||
      !companyName ||
      !companyPhoneNumber ||
      !email ||
      !password ||
      !signUpConfirmPassword
    ) {
      setSpinner(false);
      const msg = `Please fill in all required fields!`;
      manageAppContext.setAlert({ color: 'warning', msg });
      console.log(msg);
      return;
    }
    console.log(password.length);
    if (password.length < 6) {
      setSpinner(false);
      const msg = `Passwords must be at least 6 characters long`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    if (password !== signUpConfirmPassword) {
      setSpinner(false);
      const msg = `Provided passwords do not match`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    if (!validateEmail(email)) {
      setSpinner(false);
      const msg = `Provided email not valid`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    try {
      const body = {
        oneTouchPath: 'oneTouchSignUp',
        fName,
        lName,
        companyName,
        companyPhoneNumber,
        email,
        password,
        signUpConfirmPassword,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        setSpinner(false);
        manageAppContext.setAlert({ msg: data.msg });
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      manageAppContext.setPage('login');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="features">
      <div className="flex-container-50">
        <Form className="form-container">
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="fName" placeholder="First name" />
              </Col>
              <Col>
                <Form.Label>Last Name</Form.Label>
                <Form.Control id="lName" placeholder="Last name" />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>Company Name</Form.Label>
                <Form.Control id="companyName" placeholder="First name" />
              </Col>
              <Col>
                <Form.Label>Company Phone Number</Form.Label>
                <Form.Control id="companyPhoneNumber" placeholder="Last name" />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email address</Form.Label>
            <Form.Control id="email" type="email" placeholder="Enter email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              id="password"
              type="password"
              placeholder="Password"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              id="signUpConfirmPassword"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={() => oneTouchSignUp()}
            variant="success"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Create New Account
          </Button>
          <div className="divider"></div>
          <Button
            onClick={() => manageAppContext.setPage('login')}
            variant="primary"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Log In
          </Button>
        </Form>
      </div>
    </div>
  );
}
