import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';

export default function RaiseTicketFormComponent({ props }) {
  return (
    <Form className="form-container">
      <Form.Group className="mb-3">
        <Form.Label style={styles.label}>Contact Form</Form.Label>
        <Row>
          <Col>
            <Form.Label>Reason For Contacting</Form.Label>
            <Row className="mb-3">
              <Col>
                <select
                  className="form-select"
                  // onChange={(e) => handleDropDown(e)}
                >
                  <option defaultValue value="defaultValue">
                    Please Choose Your Contact Reason
                  </option>
                  <option value={'Faulty'} key={1}>
                    Faulty
                  </option>
                  <option value={'Query'} key={2}>
                    Query
                  </option>
                </select>
              </Col>
            </Row>
          </Col>
          <Col>
            <Form.Label>Priority Level</Form.Label>
            <Row className="mb-3">
              <Col>
                <select
                  className="form-select"
                  // onChange={(e) => handleDropDown(e)}
                >
                  <option defaultValue value="defaultValue">
                    Please Choose Priority Level
                  </option>
                  <option value={1} key={1}>
                    Low
                  </option>
                  <option value={2} key={2}>
                    Medium
                  </option>
                  <option value={3} key={2}>
                    High
                  </option>
                  <option value={4} key={2}>
                    Urgent
                  </option>
                </select>
              </Col>
            </Row>
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Row>
          <Col>
            <Form.Label>Subject</Form.Label>
            <Form.Control id="subject" placeholder="Subject" />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          id="description"
          as="textarea"
          placeholder="Description"
          style={{ height: '150px' }}
        />
      </Form.Group>

      <div className="divider"></div>
      <Button
        // onClick={() => addCustomer()}
        variant="primary"
        size="lg"
        className="shadow-none"
      >
        Raise a Ticket
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
