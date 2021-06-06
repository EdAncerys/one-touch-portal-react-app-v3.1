import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';

export default function CustomerInfoCard({
  pageData,
  findCustomer,
  setFindCustomer,
}) {
  let customerData = pageData.filter(
    (customer) => customer._id === findCustomer
  )[0].oneTouchCustomer;
  console.log(customerData);

  return (
    <>
      <div className="features">
        <div style={styles.btn}>
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
                    <td>{customerData.companyName}</td>
                  </tr>
                  <tr>
                    <td>Product Type</td>
                    <td>{customerData.productType}</td>
                  </tr>
                  <tr>
                    <td>Company Email</td>
                    <td>{customerData.companyEmail}</td>
                  </tr>
                  <tr>
                    <td>Company Phone Number</td>
                    <td>{customerData.companyPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Account Manager</td>
                    <td>{customerData.accountManager}</td>
                  </tr>
                  <tr>
                    <td>Company Registration</td>
                    <td>{customerData.companyRegistration}</td>
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
                    <td>{customerData.customerFName}</td>
                  </tr>
                  <tr>
                    <td>Last Name</td>
                    <td>{customerData.customerLName}</td>
                  </tr>
                  <tr>
                    <td>Customer Email</td>
                    <td>{customerData.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Customer Phone Number</td>
                    <td>{customerData.customerPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Notes</td>
                    <td>{customerData.customerNotes}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="features-align-left ">
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
                    <td>{customerData.contactFName}</td>
                  </tr>
                  <tr>
                    <td>Contact Last Name</td>
                    <td>{customerData.contactLName}</td>
                  </tr>
                  <tr>
                    <td>Contact Email</td>
                    <td>{customerData.customerEmail}</td>
                  </tr>
                  <tr>
                    <td>Contact Phone Number</td>
                    <td>{customerData.customerPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Installation Address</td>
                    <td>
                      <div>
                        {customerData.thoroughfare_number}{' '}
                        {customerData.thoroughfare_name}{' '}
                        {customerData.post_town}
                      </div>
                      <div style={styles.bottomRow}>
                        {customerData.postcode}
                      </div>
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
  },
  btn: {
    marginLeft: 'auto',
    padding: '5px',
  },
};
