import React, { useState, useEffect, useContext } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

import NDGBanner from '../NDGBanner';

export default function UserManagement({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const [customerList, setCustomerList] = useState(false);

  const pageData = manageAppContext.pageData;

  useEffect(() => {
    if (!pageData) userManagement();
  });

  async function userManagement() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'userManagement',
        access_token,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        manageAppContext.setAlert({ msg: data.msg });
        manageAppContext.setPageData(data.msg);
        console.log(data);
        return;
      }

      manageAppContext.setPageData(data.customerList);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  let totalCustomers = pageData.length;

  return (
    <div className="features">
      {pageData && (
        <>
          <div className="flex-container-30">
            <Card
              bg="Light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
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

            <NDGBanner width="flex-container-40" />
          </div>

          <div className="flex-container-70">
            <Card
              bg="Light"
              text="dark"
              style={{ width: '100%' }}
              className="mb-2"
            >
              <Card.Header>
                <div>{pageData.email} Customer List</div>
              </Card.Header>
              <Card.Body>
                <Table responsive bordered hover size="sm">
                  <thead>
                    <tr>
                      <th>#</th>
                      <th>Business Contact</th>
                      <th>Address</th>
                      <th>More</th>
                    </tr>
                  </thead>
                  <tbody>
                    {pageData.map((customer, index) => (
                      <tr key={customer._id.toString()}>
                        <td key={customer._id.toString() + 'a'}>{index + 1}</td>
                        <td key={customer._id.toString() + 'b'}>
                          <div key={index + 1}>
                            {customer.oneTouchCustomer.companyName}
                          </div>
                          <div key={index + 2} style={styles.bottomRow}>
                            {customer.oneTouchCustomer.contactName}
                          </div>
                        </td>
                        <td key={customer._id.toString() + 'c'}>
                          <div key={index + 1}>
                            {customer.oneTouchCustomer.thoroughfare_number}{' '}
                            {customer.oneTouchCustomer.thoroughfare_name}{' '}
                            {customer.oneTouchCustomer.county}
                          </div>
                          <div key={index + 2} style={styles.bottomRow}>
                            {customer.oneTouchCustomer.postcode}
                          </div>
                        </td>
                        <td
                          key={customer._id.toString() + 'd'}
                          style={styles.btnComponent}
                        >
                          <Button
                            // onClick={() => oneTouchSignUp()}
                            id={customer._id}
                            size="sm"
                            className="shadow-none"
                          >
                            Customer Info
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
  },
  btnComponent: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
