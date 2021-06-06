import React, { useEffect, useContext } from 'react';
import { Card, Table } from 'react-bootstrap';
import { AppContext } from '../../App';

import NDGBanner from '../NDGBanner';
import CustomerCard from './CustomerCard';

export default function UserManagement({ props }) {
  const { manageAppContext } = useContext(AppContext);

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
            <CustomerCard pageData={pageData} />
          </div>
        </>
      )}
    </div>
  );
}
