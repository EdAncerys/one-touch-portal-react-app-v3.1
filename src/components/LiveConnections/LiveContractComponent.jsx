import React from 'react';
import { Card, Table } from 'react-bootstrap';
import colors from '../../config/colors';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';

export default function LiveContractComponent({ pageData, setFindCustomer }) {
  let totalContracts = pageData.length;
  let totalPendingContracts = 0;
  let sixMonthPlusContracts = 0;
  let sixMonthLessContracts = 0;
  let expiredContracts = 0;

  pageData.map((contract) => {
    console.log(contract);
    const contractStartDay = contract.oneTouchBroadband.contractStartDay;
    let contractEndDay;
    let oneTouchCustomer;

    const oneTouchCustomerData = contract.oneTouchCustomer;
    if (oneTouchCustomerData)
      oneTouchCustomer = contract.oneTouchCustomer.oneTouchCustomer;
    const id = contract._id;

    // contract expiration day
    const today = new Date();
    if (contractStartDay)
      contractEndDay = new Date(contract.oneTouchBroadband.contractEndDay);
    const sixMonthsFromNow = new Date();
    sixMonthsFromNow.setMonth(today.getMonth() + 7);

    if (contractEndDay < today && contractStartDay) {
      expiredContracts += 1;
    }
    if (contractEndDay < sixMonthsFromNow && contractEndDay > today) {
      sixMonthLessContracts += 1;
    }
    if (contractEndDay > sixMonthsFromNow) {
      sixMonthPlusContracts += 1;
    }

    if (!contractStartDay) {
      totalPendingContracts += 1;
    }
  });

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
                  <td>{totalPendingContracts}</td>
                </tr>
                <tr style={{ background: colors.bgGO }}>
                  <td>Contracts EXD {'>'} 6 month</td>
                  <td>{sixMonthPlusContracts}</td>
                </tr>
                <tr style={{ background: colors.bgSET }}>
                  <td>Contracts EXD {'<'} 6 month</td>
                  <td>{sixMonthLessContracts}</td>
                </tr>
                <tr style={{ background: colors.bgSTOP }}>
                  <td>Expired Contracts</td>
                  <td>{expiredContracts}</td>
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
