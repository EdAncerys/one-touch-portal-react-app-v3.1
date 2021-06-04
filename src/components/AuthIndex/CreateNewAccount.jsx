import React, { useContext } from "react";
import { Form, Row, Col, Button } from "react-bootstrap";
import { AppContext } from "../../App";

export default function CreateNewAccount({ props }) {
  const { manageAppContext } = useContext(AppContext);

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
              id="confirmPassword"
              type="password"
              placeholder="Password"
            />
          </Form.Group>
          <Button
            onClick={() => manageAppContext.setPage("create-new-account")}
            variant="success"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Create New Account
          </Button>
          <div className="divider"></div>
          <Button
            onClick={() => manageAppContext.setPage("login")}
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
