import React from 'react';
import { Card, Table } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';

export default function LiveContractComponent({ pageData, setFindCustomer }) {
  let totalContracts = pageData.length;

  return (
    <div className="features">
      <div className="flex-container-30">
        <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
          <Card.Header>
            <div>Contract Overview Information</div>
            <div style={styles.bottomRow}>
              Manage & overview contracts - anytime, anywhere
            </div>
          </Card.Header>
          <Card.Body>
            <Table bordered hover size="sm">
              <tbody>
                <tr>
                  <td>Total Contracts</td>
                  <td>{totalContracts}</td>
                </tr>
                <tr>
                  <td>Pending Contracts</td>
                  <td>{totalContracts}</td>
                </tr>
                <tr style={{ background: 'green' }}>
                  <td>Contracts EXD {'>'} 6 month</td>
                  <td>{totalContracts}</td>
                </tr>
                <tr>
                  <td>Contracts EXD {'<'} 6 month</td>
                  <td>{totalContracts}</td>
                </tr>
                <tr>
                  <td>Expired Contracts</td>
                  <td>{totalContracts}</td>
                </tr>
              </tbody>
            </Table>
          </Card.Body>
        </Card>

        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <ContractCard pageData={pageData} setFindCustomer={setFindCustomer} />
      </div>
    </div>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
  },
};
