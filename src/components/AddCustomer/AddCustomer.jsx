import React from 'react';

import AddCustomerForm from './AddCustomerForm';

export default function AddCustomer({ props }) {
  return (
    <div className="features">
      <div className="flex-container-50">
        <AddCustomerForm />
      </div>
    </div>
  );
}
