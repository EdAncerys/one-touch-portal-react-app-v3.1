import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';

import AddCustomerForm from './AddCustomerForm';

export default function AddCustomer({ props }) {
  const { manageAppContext } = useContext(AppContext);
 

  return (
    <div className="features">
      <div className="flex-container-50">
        <AddCustomerForm />
      </div>
    </div>
  );
}
