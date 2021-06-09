import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import { validatePostcode } from './validatePostcode';
import AddressPicker from './AddressPicker';

export default function AddCustomerForm({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [formCompleted, setFormCompleted] = useState(false);

  async function addCustomer() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    if (!formCompleted) {
      const msg = `Please fill in all required fields`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    try {
      const body = {
        oneTouchPath: 'addCustomerToDB',
        access_token,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

      manageAppContext.setPageData(data.contracts);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Customer Information</Form.Label>
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
            <Form.Label>Email</Form.Label>
            <Form.Control id="email" placeholder="Email" />
          </Col>
          <Col>
            <Form.Label>Phone Number</Form.Label>
            <Form.Control id="phoneNumber" placeholder="Phone number" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Company Information</Form.Label>
        <Row>
          <Col>
            <Form.Label>Company Name</Form.Label>
            <Form.Control id="companyName" placeholder="Company name" />
          </Col>
          <Col>
            <Form.Label>Product Type</Form.Label>
            <Form.Control id="productType" placeholder="Product type" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Label>Company Email</Form.Label>
            <Form.Control id="companyEmail" placeholder="Company email" />
          </Col>
          <Col>
            <Form.Label>Company Phone Number</Form.Label>
            <Form.Control
              id="companyPhoneNumber"
              placeholder="Company phone number"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Label>Account Manager</Form.Label>
            <Form.Control id="accountManager" placeholder="Account manager" />
          </Col>
          <Col>
            <Form.Label>Company Registration</Form.Label>
            <Form.Control
              id="companyRegistration"
              placeholder="Company registration"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Site Installation Details</Form.Label>
        <Row>
          <Col>
            <Form.Label>Contact First Name</Form.Label>
            <Form.Control
              id="contactFirstName"
              placeholder="Contact first name"
            />
          </Col>
          <Col>
            <Form.Label>Contact Last Name</Form.Label>
            <Form.Control
              id="contactLastName"
              placeholder="Contact last name"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Label>Contact Email</Form.Label>
            <Form.Control id="contactEmail" placeholder="Contact email" />
          </Col>
          <Col>
            <Form.Label>Contact Phone Number</Form.Label>
            <Form.Control
              id="contactPhoneNumber"
              placeholder="Contact phone number"
            />
          </Col>
        </Row>
      </Form.Group>

      <AddressPicker />

      <Form.Group className="mb-3">
        <Form.Label>Notes</Form.Label>
        <Form.Control
          id="notes"
          as="textarea"
          placeholder="Notes"
          style={{ height: '150px' }}
        />
      </Form.Group>

      <div className="divider"></div>
      <Button
        onClick={() => addCustomer()}
        variant="primary"
        size="lg"
        className="btn-one-touch shadow-none"
      >
        Add Customer
      </Button>
    </Form>
  );
}

const styles = {
  label: {
    display: 'grid',
    justifyContent: 'center',
    fontSize: '20px',
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
