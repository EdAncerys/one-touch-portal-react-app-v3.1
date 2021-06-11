import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { Button, Row, Col } from 'react-bootstrap';

export default function DropDownPicker({
  fetchedData,
  setFetchedData,
  setSelectedAddress,
}) {
  const { manageAppContext } = useContext(AppContext);
  const [dataIndex, setDataIndex] = useState(false);
  let addressData = [];
  if (fetchedData) addressData = fetchedData;

  const handleDropDown = (e) => {
    const value = e.target.value;
    setDataIndex(value);
  };

  const selectAddress = () => {
    if (!dataIndex) {
      const msg = `Please select an address`;
      manageAppContext.setAlert({ color: 'warning', msg });
      return;
    }
    setSelectedAddress(fetchedData[dataIndex]);
  };

  return (
    <div>
      <Row className="mt-3 mb-3">
        <Col>
          <select className="form-select" onChange={(e) => handleDropDown(e)}>
            <option defaultValue value="defaultValue">
              Please Choose Your Address
            </option>

            {addressData.map((address, index) => (
              <option value={index} key={index}>
                {address.thoroughfare_number === 'null'
                  ? ''
                  : address.thoroughfare_number}{' '}
                {address.premises_name === 'null' ? '' : address.premises_name}{' '}
                {address.sub_premises === 'null' ? '' : address.sub_premises}{' '}
                {address.thoroughfare_name === 'null'
                  ? ''
                  : address.thoroughfare_name}{' '}
                {address.county === 'null' ? '' : address.county}{' '}
                {address.postcode}
              </option>
            ))}
          </select>
        </Col>
      </Row>
      <Row className="mt-3 mb-3">
        <Col style={styles.btn}>
          <Button
            onClick={() => selectAddress()}
            variant="outline-success"
            style={{ width: '100%' }}
            className="shadow-none"
          >
            Select Address
          </Button>
        </Col>
        <Col>
          <Button
            onClick={() => {
              setFetchedData(false);
              setSelectedAddress(false);
            }}
            variant="outline-primary"
            style={{ width: '100%' }}
            className="shadow-none"
          >
            Search New Postcode
          </Button>
        </Col>
      </Row>
    </div>
  );
}

const styles = {
  btn: {
    display: 'flex',
    alignSelf: 'flex-end',
    textAlign: 'center',
  },
};
