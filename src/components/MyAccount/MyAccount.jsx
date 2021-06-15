import React, { useState, useEffect, useContext } from 'react';
import { Form, Col, Row, Card, Table, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import AddressPicker from '../AddCustomer/AddressPicker';
import { validateEmail } from '../AuthIndex/validateEmail';

export default function MyAccount({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [updateAccount, setUpdateAccount] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(false);

  console.log(selectedAddress);

  const setSpinner = manageAppContext.setSpinner;
  const setPageData = manageAppContext.setPageData;
  const pageData = manageAppContext.pageData;

  useEffect(() => {
    if (!pageData) myAccount();
  });

  async function fillFromData() {
    document.getElementById('fName').value = pageData.fName
      ? pageData.fName
      : '';
    document.getElementById('lName').value = pageData.lName
      ? pageData.lName
      : '';
    document.getElementById('email').value = pageData.email
      ? pageData.email
      : '';
    document.getElementById('phoneNumber').value = pageData.phoneNumber
      ? pageData.phoneNumber
      : '';
    document.getElementById('companyName').value = pageData.companyName
      ? pageData.companyName
      : '';
    document.getElementById('productType').value = pageData.productType
      ? pageData.productType
      : '';
    document.getElementById('companyEmail').value = pageData.companyEmail
      ? pageData.companyEmail
      : '';
    document.getElementById('companyPhoneNumber').value =
      pageData.companyPhoneNumber ? pageData.companyPhoneNumber : '';

    if (pageData.postcode)
      setSelectedAddress({
        county: pageData.county,
        district_id: pageData.district,
        locality: pageData.locality,
        nad_key: pageData.nad_key,
        post_town: pageData.post_town,
        postcode: pageData.postcode,
        premises_name: pageData.premises_name,
        sub_premises: pageData.sub_premises,
        thoroughfare_name: pageData.thoroughfare_name,
        thoroughfare_number: pageData.thoroughfare_number,
      });
  }

  async function myAccount() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'myAccount',
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
        setSpinner(false);
        manageAppContext.setAlert({ msg: data.msg });
        manageAppContext.setPageData(data.msg);
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setPageData(data.user[0]);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function updateMyAccount() {
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

    if (!validateEmail(email) || !validateEmail(companyEmail)) {
      setSpinner(false);
      const msg = `Provided email not valid`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }

    if (
      !fName &&
      !lName &&
      !email &&
      !phoneNumber &&
      !companyName &&
      !productType &&
      !companyEmail &&
      !companyPhoneNumber &&
      !selectedAddress
    ) {
      setSpinner(false);
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
        oneTouchPath: 'updateMyAccount',
        access_token,
        fName,
        lName,
        email,
        phoneNumber,
        companyName,
        productType,
        companyEmail,
        companyPhoneNumber,
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
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        console.log(data);
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      setPageData(data.data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {pageData && (
        <div className="features-align-left">
          <div className="flex-container-50">
            <Card
              bg="Light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>
                <div>{pageData.fName} Account Information</div>
              </Card.Header>
              <Card.Body>
                <Table responsive="sm">
                  <tbody>
                    <tr>
                      <td>Name:</td>
                      <td>{pageData.fName}</td>
                    </tr>
                    <tr>
                      <td>Last Name:</td>
                      <td>{pageData.fName}</td>
                    </tr>
                    <tr>
                      <td>Email:</td>
                      <td>{pageData.email}</td>
                    </tr>
                    <tr>
                      <td>Phone Number:</td>
                      <td>{pageData.phoneNumber}</td>
                    </tr>
                  </tbody>
                </Table>
                <div className="mt-3 mb-3">
                  <Button
                    onClick={() => {
                      setUpdateAccount(true);
                      fillFromData();
                    }}
                    variant="outline-success"
                    size="lg"
                    className="shadow-none"
                  >
                    Update My Account
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </div>

          <div className="flex-container-50">
            <Card
              bg="Light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>
                <div>{pageData.fName} Company Information</div>
              </Card.Header>
              <Card.Body>
                <Table responsive="sm">
                  <tbody>
                    <tr>
                      <td>Company Name:</td>
                      <td>{pageData.companyName}</td>
                    </tr>
                    <tr>
                      <td>Product Type:</td>
                      <td>{pageData.productType}</td>
                    </tr>
                    <tr>
                      <td>Company Email:</td>
                      <td>{pageData.companyEmail}</td>
                    </tr>
                    <tr>
                      <td>Company Phone Number:</td>
                      <td>{pageData.companyPhoneNumber}</td>
                    </tr>
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </div>
      )}

      {pageData && (
        <div className="features">
          <div className="flex-container-60">
            <Form className="form-container">
              <Form.Group className="mb-3">
                <Form.Label style={styles.label}>
                  Customer Information
                </Form.Label>
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
                <Form.Label style={styles.label}>
                  Company Information
                </Form.Label>
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
                    <Form.Control
                      id="companyEmail"
                      placeholder="Company email"
                    />
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

              <AddressPicker
                selectedAddress={selectedAddress}
                setSelectedAddress={setSelectedAddress}
              />

              <div className="divider"></div>
              <Button
                onClick={() => updateMyAccount()}
                variant="primary"
                size="lg"
                className="btn-one-touch shadow-none"
              >
                Update My Account
              </Button>
            </Form>
          </div>
        </div>
      )}
    </>
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
