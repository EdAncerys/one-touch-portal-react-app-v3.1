import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function ContractOverviewCard({ setFilterUser }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let totalUsers = pageData.length;
  let totalPendingUsers = 0;
  let liveUsers = 0;

  pageData.map((user) => {
    const userApproved = user.oneTouchSuperUser.userApproved;

    if (!userApproved) {
      totalPendingUsers += 1;
    }
    if (userApproved) {
      liveUsers += 1;
    }

    return pageData;
  });

  return (
    <div>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>Portal Users Overview Information</div>
          <div style={styles.bottomRow}>Manage users - anytime, anywhere</div>
        </Card.Header>
        <Card.Body>
          <Table bordered hover size="sm">
            <tbody>
              <tr onClick={() => setFilterUser(false)} className="cursor-on">
                <td>Total Users</td>
                <td>{totalUsers}</td>
              </tr>
              <tr
                onClick={() => setFilterUser('active-user')}
                className="cursor-on"
                style={{ background: colors.bgGO }}
              >
                <td>Active Users</td>
                <td>{liveUsers}</td>
              </tr>
              <tr
                onClick={() => setFilterUser('pending')}
                className="cursor-on"
                style={{ background: colors.bgPENDING }}
              >
                <td>Pending Users</td>
                <td>{totalPendingUsers}</td>
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
