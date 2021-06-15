import React, { useState, useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import { colors } from '../../config/colors';

export default function BroadbandInfoCard({
  oneTouchBroadband,
  oneTouchCustomer,
  setOneTouchBroadband,
  setOneTouchCustomer,
  setAddCustomer,
  setBroadbandData,
  setSelectedAddress,
}) {
  const { manageAppContext } = useContext(AppContext);
  const [termsAndConditions, setTermsAndConditions] = useState(false);

  const customerData = oneTouchCustomer.oneTouchCustomer;
  console.log(customerData);

  async function placeBroadbandOrder() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'placeBroadbandOrder',
        oneTouchBroadband,
        oneTouchCustomer: { id: oneTouchCustomer._id },
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
        manageAppContext.setAlert({ color: 'warning', msg: data.msg });
        manageAppContext.setPageData(false);
        console.log(data);
        return;
      }

      manageAppContext.setAlert({ color: 'success', msg: data.msg });
      manageAppContext.setPageData(false);
      setBroadbandData(false);
      setOneTouchCustomer(false);
      setAddCustomer(false);
      setSelectedAddress(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      {!termsAndConditions && (
        <>
          <div className="features-align-right">
            <div style={styles.btn}>
              <Button
                onClick={() => setOneTouchBroadband(false)}
                variant="outline-dark"
                size="sm"
              >
                <span aria-hidden="true">×</span>
              </Button>
            </div>
          </div>

          <div className="features">
            <div className="flex-container-100">
              <div style={styles.header}>Review Your Order</div>
            </div>
          </div>

          {!termsAndConditions && (
            <div className="features">
              <div className="flex-container-50">
                <Card
                  bg="Light"
                  text="dark"
                  style={{ width: '100%' }}
                  className="mb-2"
                >
                  <Card.Header>
                    <div>Broadband Information</div>
                  </Card.Header>
                  <Card.Body>
                    <Table bordered hover size="sm">
                      <tbody>
                        <tr>
                          <td>Broadband Name</td>
                          <td>{oneTouchBroadband.name}</td>
                        </tr>
                        <tr>
                          <td>Provider</td>
                          <td>{oneTouchBroadband.provider}</td>
                        </tr>
                        <tr>
                          <td>Technology</td>
                          <td>{oneTouchBroadband.technology}</td>
                        </tr>
                        <tr>
                          <td>Contract Price</td>
                          <td>{oneTouchBroadband.price}</td>
                        </tr>
                        <tr>
                          <td>Installation</td>
                          <td>{oneTouchBroadband.installation}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>

              <div className="flex-container-50">
                <Card
                  bg="Light"
                  text="dark"
                  style={{ width: '100%' }}
                  className="mb-2"
                >
                  <Card.Header>
                    <div>Contract Information</div>
                  </Card.Header>
                  <Card.Body>
                    <Table bordered hover size="sm">
                      <tbody>
                        <tr>
                          <td>Company</td>
                          <td>{customerData.companyName}</td>
                        </tr>
                        <tr>
                          <td>Name</td>
                          <td>{customerData.fName}</td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td>{customerData.lName}</td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td>{customerData.email}</td>
                        </tr>
                        <tr>
                          <td>Phone Number</td>
                          <td>{customerData.phoneNumber}</td>
                        </tr>
                        <tr>
                          <td>Installation Address</td>
                          <td>
                            {customerData.thoroughfare_number === 'null'
                              ? ''
                              : customerData.thoroughfare_number}{' '}
                            {customerData.premises_name === 'null'
                              ? ''
                              : customerData.premises_name}{' '}
                            {customerData.sub_premises === 'null'
                              ? ''
                              : customerData.sub_premises}{' '}
                            {customerData.thoroughfare_name === 'null'
                              ? ''
                              : customerData.thoroughfare_name}{' '}
                            {customerData.county === 'null'
                              ? ''
                              : customerData.county}{' '}
                            {customerData.postcode}
                          </td>
                        </tr>
                      </tbody>
                    </Table>
                  </Card.Body>
                </Card>
              </div>
            </div>
          )}

          <div className="features-align-left">
            <div className="flex-container-50">
              <Button
                onClick={() => setTermsAndConditions(true)}
                variant="outline-success"
                size="m"
                className="shadow-none mt-3"
              >
                Place Order
              </Button>
            </div>
          </div>
        </>
      )}

      {termsAndConditions && (
        <>
          <div className="features-align-right">
            <div style={styles.btn}>
              <Button
                onClick={() => setTermsAndConditions(false)}
                variant="outline-dark"
                size="sm"
              >
                <span aria-hidden="true">×</span>
              </Button>
            </div>
          </div>

          <div className="features">
            <div className="flex-container-100">
              <div style={styles.header}>Review Terms & Conditions</div>
            </div>
          </div>

          <div className="features">
            <div className="flex-container-50">
              <Card
                bg="Light"
                text="dark"
                style={{ width: '100%' }}
                className="mb-2"
              >
                <Card.Header>
                  <div>Terms & Conditions</div>
                </Card.Header>
                <Card.Body style={styles.termsAndConditions}>
                  <div>Terms & Conditions</div>
                  <Button
                    onClick={() => placeBroadbandOrder()}
                    variant="outline-success"
                    size="m"
                    className="shadow-none mt-3"
                  >
                    Agree & Place Your Order
                  </Button>
                </Card.Body>
              </Card>
            </div>
          </div>
        </>
      )}

      <div className="features">
        <NDGBanner width="flex-container-30" />
      </div>
    </>
  );
}

const styles = {
  header: {
    fontSize: '24px',
    textAlign: 'center',
    color: colors.darkGrey,
  },
  termsAndConditions: {
    textAlign: 'center',
  },
  btn: {
    padding: '5px',
  },
};
