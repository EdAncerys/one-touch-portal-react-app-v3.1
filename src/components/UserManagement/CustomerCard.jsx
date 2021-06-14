import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function CustomerCard({ setOneTouchCustomer, setFindCustomer }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  const connectionChecker = manageAppContext.page === 'connection-checker';

  async function filterCustomers(id) {
    const customer = pageData.filter((data) => data._id === id)[0];
    setOneTouchCustomer(customer);
  }

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
                      {customer.oneTouchCustomer.thoroughfare_number === 'null'
                        ? ''
                        : customer.oneTouchCustomer.thoroughfare_number}{' '}
                      {customer.oneTouchCustomer.premises_name === 'null'
                        ? ''
                        : customer.oneTouchCustomer.premises_name}{' '}
                      {customer.oneTouchCustomer.sub_premises === 'null'
                        ? ''
                        : customer.oneTouchCustomer.sub_premises}{' '}
                      {customer.oneTouchCustomer.thoroughfare_name === 'null'
                        ? ''
                        : customer.oneTouchCustomer.thoroughfare_name}{' '}
                      {customer.oneTouchCustomer.county === 'null'
                        ? ''
                        : customer.oneTouchCustomer.county}
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
                      onClick={() => setFindCustomer(customer._id)}
                      id={customer._id}
                      size="sm"
                      className="shadow-none"
                      style={styles.btn}
                    >
                      Customer Info
                    </Button>
                    {connectionChecker && (
                      <Button
                        onClick={() => filterCustomers(customer._id)}
                        id={customer._id}
                        variant="outline-success"
                        size="sm"
                        className="shadow-none"
                        style={styles.btn}
                      >
                        Add Customer
                      </Button>
                    )}
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
    color: colors.darkGrey,
  },
  btnComponent: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
  btn: {
    margin: '0 5px',
  },
};
