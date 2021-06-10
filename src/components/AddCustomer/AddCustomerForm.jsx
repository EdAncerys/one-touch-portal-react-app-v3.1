import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import AddressPicker from './AddressPicker';
import { validateEmail } from '../AuthIndex/validateEmail';

export default function AddCustomerForm({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);

  async function addCustomer() {
    const fName = document.getElementById('fName').value;
    const lName = document.getElementById('lName').value;
    const email = document.getElementById('email').value;
    const phoneNumber = document.getElementById('phoneNumber').value;

    const companyName = document.getElementById('companyName').value;
    const productType = document.getElementById('productType').value;
    const companyEmail = document.getElementById('companyEmail').value;
    const companyPhoneNumber =
      document.getElementById('companyPhoneNumber').value;
    const accountManager = document.getElementById('accountManager').value;
    const companyRegistration = document.getElementById(
      'companyRegistration'
    ).value;

    const contactFirstName = document.getElementById('contactFirstName').value;
    const contactLastName = document.getElementById('contactLastName').value;
    const contactEmail = document.getElementById('contactEmail').value;
    const contactPhoneNumber =
      document.getElementById('contactPhoneNumber').value;
    const notes = document.getElementById('notes').value;

    if (
      !validateEmail(email) ||
      !validateEmail(companyEmail) ||
      !validateEmail(contactEmail)
    ) {
      const msg = `Provided email not valid`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    if (
      !!fName &&
      !!lName &&
      !!email &&
      !!phoneNumber &&
      !!companyName &&
      !!productType &&
      !!companyEmail &&
      !!companyPhoneNumber &&
      !!accountManager &&
      !!companyRegistration &&
      !!contactFirstName &&
      !!contactLastName &&
      !!contactEmail &&
      !!contactPhoneNumber &&
      selectedAddress
    )
      setFormCompleted(true);

    if (!selectedAddress && !formCompleted) {
      const msg = `Please fill in all required fields`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    try {
      const access_token = manageAppContext.accessToken.access_token;
      const URL = '/.netlify/functions/mongoDB';

      const county = selectedAddress['county'];
      const district_id = selectedAddress['district_id'];
      const locality = selectedAddress['locality'];
      const nad_key = selectedAddress['nad_key'];
      const post_town = selectedAddress['post_town'];
      const postcode = selectedAddress['postcode'];
      const premises_name = selectedAddress['premises_name'];
      const sub_premises = selectedAddress['sub_premises'];
      const thoroughfare_name = selectedAddress['thoroughfare_name'];
      const thoroughfare_number = selectedAddress['thoroughfare_number'];

      const body = {
        oneTouchPath: 'addCustomerToDB',
        access_token,
        fName,
        lName,
        email,
        phoneNumber,
        companyName,
        productType,
        companyEmail,
        companyPhoneNumber,
        accountManager,
        companyRegistration,
        contactFirstName,
        contactLastName,
        contactEmail,
        contactPhoneNumber,
        county,
        district_id,
        locality,
        nad_key,
        post_town,
        postcode,
        premises_name,
        sub_premises,
        thoroughfare_name,
        thoroughfare_number,
        notes,
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

      manageAppContext.setAlert({ color: 'success', msg: data.msg });
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

      <AddressPicker
        selectedAddress={selectedAddress}
        setSelectedAddress={setSelectedAddress}
      />

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
