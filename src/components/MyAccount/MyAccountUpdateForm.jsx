import React from 'react';
import { Form, Col, Row, Button } from 'react-bootstrap';

import AddressPicker from '../AddCustomer/AddressPicker';

export default function MyAccountUpdateForm({
  selectedAddress,
  setSelectedAddress,
  updateUserAccount,
  setUpdateAccount,
}) {
  return (
    <div className="features">
      <div className="flex-container-60">
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
                <Form.Control
                  id="phoneNumber"
                  type="number"
                  placeholder="Phone number"
                />
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
                  type="number"
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
          <Form.Group className="mb-3">
            <Row>
              <Col>
                <Button
                  onClick={() => updateUserAccount()}
                  variant="outline-success"
                  size="lg"
                  className="shadow-none"
                  style={styles.btn}
                >
                  Update My Account
                </Button>
              </Col>
              <Col>
                <Button
                  onClick={() => {
                    setSelectedAddress(false);
                    setUpdateAccount(false);
                  }}
                  variant="outline-primary"
                  size="lg"
                  className="shadow-none"
                  style={styles.btn}
                >
                  Go Back
                </Button>
              </Col>
            </Row>
          </Form.Group>
        </Form>
      </div>
    </div>
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
    width: '100%',
  },
};
