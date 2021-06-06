import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

export default function CustomerCard({ pageData }) {
  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
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
