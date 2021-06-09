import React, { useState, useContext } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import { validatePostcode } from './validatePostcode';

export default function AddressPicker({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [fetchedData, setFetchedData] = useState(false);
  const [selectAddress, setSelectAddress] = useState(false);
  console.log(fetchedData);
  async function fetchAddress() {
    const URL = '/.netlify/functions/icUK';
    const postcode = document
      .querySelector('#postcode')
      .value.replace(/\s/g, '');

    if (!postcode) {
      const msg = `Postcode not provided`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    if (!validatePostcode(postcode)) {
      const msg = `Provided postcode not valid`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    const body = {
      oneTouchPath: 'fetchAddress',
      postcode,
    };
    console.log(body);
    const config = {
      method: 'POST',
      body: JSON.stringify(body),
    };

    try {
      const response = await fetch(URL, config);
      const data = await response.json();
      console.log(data);

      if (!response.ok) {
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData(false);
        return;
      }

      manageAppContext.setAlert({ color: 'warning', msg: data.msg });
      setFetchedData(data.addresses);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form.Group className="mb-3">
      <Row>
        <Col>
          <Form.Label>Postcode</Form.Label>
          <Form.Control id="postcode" type="text" placeholder="Postcode" />
        </Col>
        <Col style={styles.btn}>
          <Button
            onClick={() => fetchAddress()}
            variant="primary"
            size="lg"
            className="btn-one-touch shadow-none"
          >
            Search Address
          </Button>
        </Col>
      </Row>
    </Form.Group>
  );
}

const styles = {
  btn: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
