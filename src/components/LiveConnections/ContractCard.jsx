import React from 'react';
import { Card, Table, Button } from 'react-bootstrap';

export default function CustomerCard({ pageData, setFindContract }) {
  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>Contact List</div>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Company Name</th>
                <th>Address</th>
                <th>Provider</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((customer, index) => {
                let customerData = customer.oneTouchCustomer[0];
                if (customerData)
                  customerData = customer.oneTouchCustomer[0].oneTouchCustomer;
                console.log(customerData);

                return (
                  // {findContract && (
                  //   <ContractInfoCard
                  //     pageData={pageData}
                  //     findContract={findContract}
                  //     setFindContract={setFindContract}
                  //   />
                  // )}

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
                        {customerData && (
                          <div>
                            {customerData.thoroughfare_number}{' '}
                            {customerData.premises_name}{' '}
                            {customerData.sub_premises}{' '}
                            {customerData.thoroughfare_name}{' '}
                            {customerData.county}
                          </div>
                        )}
                      </div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {customerData && customerData.postcode}
                      </div>
                    </td>
                    <td key={customer._id.toString() + 'd'}>
                      <div key={index + 1}>
                        {customer.oneTouchCustomer.companyName}
                      </div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {customerData && customerData.contactName}
                      </div>
                    </td>
                    <td key={customer._id.toString() + 'e'} style={styles.btn}>
                      <Button
                        onClick={() => setFindContract(customer._id)}
                        id={customer._id}
                        size="sm"
                        className="shadow-none"
                      >
                        Contract Info
                      </Button>
                    </td>
                  </tr>
                );
              })}
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
  btn: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
