import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function ContractOverviewCard({ setFilterContract }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let totalUsers = pageData.length;
  let totalPendingUsers = 0;
  let liveUsers = 0;

  pageData.map((user) => {
    if (user) {
      totalPendingUsers += 1;
    }
    if (user) {
      liveUsers += 1;
    }

    return pageData;
  });

  return (
    <div>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>Portal Users Overview Information</div>
          <div style={styles.bottomRow}>
            Manage & overview users - anytime, anywhere
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
                <td>{totalUsers}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('live-contracts')}
                className="cursor-on"
              >
                <td>Live Contracts</td>
                <td>{liveUsers}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('pending')}
                className="cursor-on"
                style={{ background: colors.bgPENDING }}
              >
                <td>Pending Contracts</td>
                <td>{totalPendingUsers}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('moreThenSixMonth')}
                className="cursor-on"
                style={{ background: colors.bgGO }}
              >
                <td>Contracts EXD {'>'} 6 month</td>
                <td>{sixMonthPlusContracts}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('lessThenSixMonth')}
                className="cursor-on"
                style={{ background: colors.bgSET }}
              >
                <td>Contracts EXD {'<'} 6 month</td>
                <td>{sixMonthLessContracts}</td>
              </tr>
              <tr
                onClick={() => setFilterContract('expired')}
                className="cursor-on"
                style={{ background: colors.bgSTOP }}
              >
                <td>Expired Contracts</td>
                <td>{expiredContracts}</td>
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
