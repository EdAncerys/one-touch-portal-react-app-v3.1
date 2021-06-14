import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import CustomerCard from './CustomerCard';

export default function CustomerListComponent({
  setFindCustomer,
  setOneTouchCustomer,
}) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let totalCustomers = pageData.length;

  return (
    <div className="features">
      <div className="flex-container-30">
        <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
          <Card.Header>
            <div>{pageData.fName} Customer Information</div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover size="sm">
              <tbody>
                <tr>
                  <td>Total Customers</td>
                  <td>{totalCustomers}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <CustomerCard
          setFindCustomer={setFindCustomer}
          setOneTouchCustomer={setOneTouchCustomer}
        />
      </div>
    </div>
  );
}
