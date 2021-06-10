import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import { colors } from '../../config/colors';

export default function CustomerInfoCard({ findCustomer, setFindCustomer }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let data = pageData.filter((customer) => customer._id === findCustomer)[0]
    .oneTouchCustomer;
  console.log(data);

  async function deleteCustomer() {
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/mongoDB';

    try {
      const body = {
        oneTouchPath: 'deleteCustomer',
        access_token,
        id: findCustomer,
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
        console.log(data);
        return;
      }

      const updateData = pageData.filter(
        (customer) => customer._id !== findCustomer
      );

      setFindCustomer(false);
      manageAppContext.setPageData(updateData);
      manageAppContext.setAlert({ color: 'success', msg: data.msg });
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <>
      <div className="features-align-right">
        <div style={styles.btnClose}>
          <Button
            onClick={() => setFindCustomer(false)}
            variant="outline-dark"
            size="sm"
          >
            <span aria-hidden="true">×</span>
          </Button>
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
              <div>Company Information</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Company Name</td>
                    <td>{data.companyName}</td>
                  </tr>
                  <tr>
                    <td>Product Type</td>
                    <td>{data.productType}</td>
                  </tr>
                  <tr>
                    <td>Company Email</td>
                    <td>{data.companyEmail}</td>
                  </tr>
                  <tr>
                    <td>Company Phone Number</td>
                    <td>{data.companyPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Account Manager</td>
                    <td>{data.accountManager}</td>
                  </tr>
                  <tr>
                    <td>Company Registration</td>
                    <td>{data.companyRegistration}</td>
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
              <div>Customer Information</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>First Name</td>
                    <td>{data.fName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{data.lName}</td>
                  </tr>
                  <tr>
                    <td>Customer Email</td>
                    <td>{data.email}</td>
                  </tr>
                  <tr>
                    <td>Customer Phone Number</td>
                    <td>{data.phoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Notes</td>
                    <td>{data.notes}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
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
              <div>Site Installation Details</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td>Contact Name</td>
                    <td>{data.contactFirstName}</td>
                  </tr>
                  <tr>
                    <td>Contact Last Name</td>
                    <td>{data.contactLastName}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>{data.contactEmail}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone Number</td>
                    <td>{data.contactPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Installation Address</td>
                    <td>
                      <div>
                        {data.thoroughfare_number === 'null'
                          ? ''
                          : data.thoroughfare_number}{' '}
                        {data.premises_name === 'null'
                          ? ''
                          : data.premises_name}{' '}
                        {data.sub_premises === 'null' ? '' : data.sub_premises}{' '}
                        {data.thoroughfare_name === 'null'
                          ? ''
                          : data.thoroughfare_name}{' '}
                        {data.county}
                      </div>
                      <div style={styles.bottomRow}>{data.postcode}</div>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
        <div className="flex-container-50">
          <Card style={styles.manageCard} className="mb-2">
            <Card.Header>
              <div>Manage Customer</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td style={styles.cardText}>Delete Customer</td>
                    <td style={styles.btn}>
                      <Button
                        onClick={() => deleteCustomer()}
                        variant="outline-danger"
                        size="sm"
                      >
                        Delete Customer
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
      <div className="features">
        <NDGBanner width="flex-container-30" />
      </div>
    </>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
    color: colors.darkGrey,
  },
  manageCard: {
    background: colors.bgSTOP,
    color: colors.white,
  },
  cardText: {
    color: colors.white,
  },
  btnClose: {
    padding: '5px',
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
  },
};
