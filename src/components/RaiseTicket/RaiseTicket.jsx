import React, { useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import NDGBanner from '../NDGBanner';

export default function RaiseTicket({ props }) {
  const { manageAppContext } = useContext(AppContext);

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
    const fName = document.querySelector('#fName').value;
    const lName = document.querySelector('#lName').value;
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;
    const signUpConfirmPassword = document.querySelector(
      '#signUpConfirmPassword'
    ).value;
    const URL = '/.netlify/functions/mongoDB';

    if (
      fName === '' ||
      lName === '' ||
      email === '' ||
      password === '' ||
      signUpConfirmPassword === ''
    ) {
      const msg = `Please fill in all required fields!`;
      manageAppContext.setAlert({ msg });
      console.log(msg);
      return;
    }

    try {
      const body = {
        oneTouchPath: 'oneTouchSignUp',
        fName,
        lName,
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
        manageAppContext.setAlert({ msg: data.msg });
        console.log(data);
        return;
      }

      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      manageAppContext.setPage('login');
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="features">
      <NDGBanner width="flex-container-40" />

      <div className="flex-container-60">
        <Form className="form-container">
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Form.Label>First Name</Form.Label>
                <Form.Control id="fName" placeholder="First name" />
              </Col>
              <Col></Col>
            </Row>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              id="subject"
              type="subject"
              placeholder="Enter subject"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              id="description"
              as="textarea"
              placeholder="Enter description"
              style={{ height: '150px' }}
            />
          </Form.Group>

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
