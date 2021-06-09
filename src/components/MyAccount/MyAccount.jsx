import React, { useEffect, useContext } from 'react';
import { Card, Table, Button } from 'react-bootstrap';
import { AppContext } from '../../App';

export default function MyAccount({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const pageData = manageAppContext.pageData[0];

  useEffect(() => {
    if (!pageData) myAccount();
  });

  async function myAccount() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'myAccount',
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

      manageAppContext.setPageData(data.user);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div className="features">
      {pageData && (
        <div className="flex-container-100">
          <Card
            bg="Light"
            text="dark"
            style={{ width: '100%' }}
            className="mb-2"
          >
            <Card.Header>
              <div>{pageData.fName} Account Information</div>
            </Card.Header>
            <Card.Body>
              <Card.Text>
                Overlook and manage your account in one place
              </Card.Text>

              <Table responsive="sm">
                <tbody>
                  <tr>
                    <td>Email:</td>
                    <td>{pageData.email}</td>
                  </tr>
                  <tr>
                    <td>Name:</td>
                    <td>{pageData.fName}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{pageData.lName}</td>
                  </tr>
                </tbody>
              </Table>
              <Button
                // onClick={() => oneTouchSignUp()}
                variant="success"
                size="lg"
                className="btn-one-touch shadow-none"
              >
                Update My Account
              </Button>
            </Card.Body>
          </Card>
        </div>
      )}
    </div>
  );
}
