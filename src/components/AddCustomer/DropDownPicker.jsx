import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { Button } from 'react-bootstrap';

export default function DropDownPicker({ fetchedData, setSelectedAddress }) {
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
      <div className="mt-3 mb-3">
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
      </div>
      <div className="mb-3">
        <Button
          onClick={() => selectAddress()}
          variant="primary"
          size="lg"
          className="btn-one-touch shadow-none"
        >
          Select Address
        </Button>
      </div>
    </div>
  );
}
