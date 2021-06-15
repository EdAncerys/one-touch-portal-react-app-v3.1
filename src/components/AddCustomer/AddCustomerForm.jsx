import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import AddressPicker from './AddressPicker';
import { validateEmail } from '../AuthIndex/validateEmail';

export default function AddCustomerForm({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [selectedAddress, setSelectedAddress] = useState(false);
  const [formCompleted, setFormCompleted] = useState(false);
  const [clearFormData, setClearFormData] = useState(false);

  const dev = manageAppContext.accessToken.role === 'dev';
  const setSpinner = manageAppContext.setSpinner;

  useEffect(() => {
    if (clearFormData) clearFromData();
  }, [clearFormData]); // eslint-disable-line

  async function fillFromData() {
    document.getElementById('fName').value = 'John';
    document.getElementById('lName').value = 'Smith';
    document.getElementById('email').value = 'john@email.com';
    document.getElementById('phoneNumber').value = '07565888999';

    document.getElementById('companyName').value = 'Some Company Name';
    document.getElementById('productType').value = 'Product Type For Company';
    document.getElementById('companyEmail').value = 'john@email.com';

    document.getElementById('companyPhoneNumber').value = '07565888999';
    document.getElementById('accountManager').value = 'Account Manager';
    document.getElementById('companyRegistration').value =
      'Company Registration';

    document.getElementById('contactFirstName').value = 'Ben';
    document.getElementById('contactLastName').value = 'Dover';
    document.getElementById('contactEmail').value = 'john@email.com';

    document.getElementById('contactPhoneNumber').value = '07565888999';
    document.getElementById('notes').value = 'Customer Notes';
  }

  async function clearFromData() {
    document.getElementById('fName').value = '';
    document.getElementById('lName').value = '';
    document.getElementById('email').value = '';
    document.getElementById('phoneNumber').value = '';

    document.getElementById('companyName').value = '';
    document.getElementById('productType').value = '';
    document.getElementById('companyEmail').value = '';

    document.getElementById('companyPhoneNumber').value = '';
    document.getElementById('accountManager').value = '';
    document.getElementById('companyRegistration').value = '';

    document.getElementById('contactFirstName').value = '';
    document.getElementById('contactLastName').value = '';
    document.getElementById('contactEmail').value = '';

    document.getElementById('contactPhoneNumber').value = '';
    document.getElementById('notes').value = '';

    setSelectedAddress(false);
    setFormCompleted(false);
  }

  async function addCustomer() {
    setSpinner(true);

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
      setSpinner(false)
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
      setSpinner(false)
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
        setSpinner(false)
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

      setSpinner(false)
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      setClearFormData(true);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form className="form-container">
      {dev && (
        <Button
          onClick={() => fillFromData()}
          variant="outline-success"
          size="m"
          className="shadow-none m-2"
        >
          Fill Form Data
        </Button>
      )}
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
