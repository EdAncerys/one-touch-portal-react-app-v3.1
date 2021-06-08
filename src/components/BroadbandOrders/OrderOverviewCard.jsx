import React from 'react';
import { Card, Table } from 'react-bootstrap';

import colors from '../../config/colors';

export default function OrderOverviewCard({ pageData, setFilterContract }) {
  let totalContracts = pageData.length;
  let totalPendingContracts = 0;
  let sixMonthPlusContracts = 0;
  let sixMonthLessContracts = 0;
  let expiredContracts = 0;

  pageData.map((contract) => {
    const contractStartDay = contract.oneTouchBroadband.contractStartDay;
    let contractEndDay;

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
    <div>
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
              <tr
                onClick={() => setFilterContract(false)}
                className="cursor-on"
              >
                <td>Total Contracts</td>
                <td>{totalContracts}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('pending')}
                className="cursor-on"
                style={{ background: colors.bgPENDING }}
              >
                <td>Pending Contracts</td>
                <td>{totalPendingContracts}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('live')}
                className="cursor-on"
                style={{ background: colors.bgGO }}
              >
                <td>Live Contracts</td>
                <td>{sixMonthPlusContracts}</td>
              </tr>
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
};
