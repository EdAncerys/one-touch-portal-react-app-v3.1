import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

export default function RaiseTicketFormComponent({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [reason, setReason] = useState(false);
  const [priority, setPriority] = useState(false);
  const [subject, setSubject] = useState(false);
  const [description, setDescription] = useState(false);

  console.log(reason);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;

  async function clearFromData() {
    document.getElementById('reason').value = 'defaultValue';
    document.getElementById('priority').value = 'defaultValue';
    document.getElementById('subject').value = '';
    document.getElementById('description').value = '';
  }

  async function raiseTicket() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/freshDesk';

    if (!reason || !priority || !subject || !description) {
      setSpinner(false);
      const msg = `Please fill in all required fields!`;
      manageAppContext.setAlert({ color: 'warning', msg });
      console.log(msg);
      return;
    }

    try {
      const body = {
        oneTouchPath: 'raiseTicket',
        access_token,
        reason,
        priority,
        subject,
        description,
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
      manageAppContext.setPageData(pageData.push(data));
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

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
                  id="reason"
                  onChange={(e) => setReason(e.target.value)}
                >
                  <option defaultValue value="defaultValue">
                    Please Choose Your Contact Reason
                  </option>
                  <option value={'Faulty'} key={'faulty'}>
                    Faulty
                  </option>
                  <option value={'Query'} key={'query'}>
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
                  id="priority"
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option defaultValue value="defaultValue">
                    Please Choose Priority Level
                  </option>
                  <option value={1} key={'low'}>
                    Low
                  </option>
                  <option value={2} key={'medium'}>
                    Medium
                  </option>
                  <option value={3} key={'high'}>
                    High
                  </option>
                  <option value={4} key={'urgent'}>
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
            <Form.Control
              onChange={(e) => setSubject(e.target.value)}
              id="subject"
              placeholder="Subject"
            />
          </Col>
        </Row>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Description</Form.Label>
        <Form.Control
          onChange={(e) => setDescription(e.target.value)}
          id="description"
          as="textarea"
          placeholder="Description"
          style={{ height: '150px' }}
        />
      </Form.Group>

      <div className="divider"></div>
      <Button
        onClick={() => raiseTicket()}
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
