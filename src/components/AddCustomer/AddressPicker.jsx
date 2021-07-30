import React, { useState, useContext, useEffect } from 'react';
import { Form, Row, Col, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import { validatePostcode } from './validatePostcode';
import DropDownPicker from './DropDownPicker';

export default function AddressPicker({
  selectedAddress,
  setSelectedAddress,
  setOneTouchCustomer,
}) {
  const { manageAppContext } = useContext(AppContext);
  const [fetchedData, setFetchedData] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const connectionChecker = manageAppContext.page === 'connection-checker';

  useEffect(() => {
    if (!selectedAddress) setFetchedData(false);
  }, [selectedAddress]); // eslint-disable-line

  async function fetchAddress() {
    setSpinner(true);
    const URL = '/.netlify/functions/icUK';
    const postcode = document
      .querySelector('#postcode')
      .value.replace(/\s/g, '');

    if (!postcode) {
      setSpinner(false);
      const msg = `Postcode not provided`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    if (!validatePostcode(postcode)) {
      setSpinner(false);
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
        setSpinner(false);
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        return;
      }

      setSpinner(false);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      setFetchedData(data.addresses);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Form.Group style={styles.addressPicker}>
      {!fetchedData && (
        <Row>
          <Col>
            <Form.Label>Search by postcode</Form.Label>
            <Form.Control id="postcode" type="text" placeholder="Postcode" />
          </Col>
          <Col style={styles.btn}>
            <Button
              onClick={() => {
                if (setOneTouchCustomer) setOneTouchCustomer(false);
                fetchAddress();
              }}
              variant="outline-success"
              style={{ width: '100%' }}
              className="shadow-none btn-round"
            >
              Search Address
            </Button>
          </Col>
        </Row>
      )}

      {fetchedData && !selectedAddress && (
        <DropDownPicker
          fetchedData={fetchedData}
          setFetchedData={setFetchedData}
          setSelectedAddress={setSelectedAddress}
        />
      )}

      {selectedAddress && (
        <Row>
          <Col style={styles.btn}>
            <Form.Label>
              {selectedAddress.thoroughfare_number === 'null'
                ? ''
                : selectedAddress.thoroughfare_number}{' '}
              {selectedAddress.premises_name === 'null'
                ? ''
                : selectedAddress.premises_name}{' '}
              {selectedAddress.sub_premises === 'null'
                ? ''
                : selectedAddress.sub_premises}{' '}
              {selectedAddress.thoroughfare_name === 'null'
                ? ''
                : selectedAddress.thoroughfare_name}{' '}
              {selectedAddress.county === 'null' ? '' : selectedAddress.county}{' '}
              {selectedAddress.postcode}
            </Form.Label>
          </Col>
          {!connectionChecker && (
            <Col style={styles.btn}>
              <Button
                onClick={() => {
                  setFetchedData(false);
                  setSelectedAddress(false);
                }}
                variant="outline-primary btn-round"
                style={{ width: '100%' }}
                className="shadow-none"
              >
                Search New Postcode
              </Button>
            </Col>
          )}
        </Row>
      )}
    </Form.Group>
  );
}

const styles = {
  btn: {
    display: 'flex',
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
  addressPicker: {
    width: '100%',
  }
};
