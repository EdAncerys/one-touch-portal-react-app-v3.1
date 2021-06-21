import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function CustomerCard({ setFindUser, filterUser }) {
  const { manageAppContext } = useContext(AppContext);
  const pageData = manageAppContext.pageData;

  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>User List</div>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Contact</th>
                <th>Company Details</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((user, index) => {
                const userApproved = user.oneTouchSuperUser.userApproved;
                const userData = user.oneTouchSuperUser;

                let userVisibility = '';
                let userStatus = 'pending';
                let bgColor = colors.bgPENDING;

                if (userApproved) {
                  bgColor = colors.bgGO;
                  userStatus = 'active-user';
                }
                if (filterUser !== userStatus && filterUser)
                  userVisibility = 'hidden';

                return (
                  <tr
                    style={{ background: bgColor }}
                    className={userVisibility}
                    key={user._id.toString()}
                  >
                    <td key={user._id.toString() + 'a'}>{index + 1}</td>
                    <td key={user._id.toString() + 'b'}>
                      <div key={index + 1}>{userData.fName}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {userData.lName}
                      </div>
                    </td>
                    <td key={user._id.toString() + 'c'}>
                      <div key={index + 1}>{userData.companyPhoneNumber}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {userData.email}
                      </div>
                    </td>
                    <td key={user._id.toString() + 'd'}>
                      <div key={index + 1}>{userData.companyName}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {userData.companyPhoneNumber}
                      </div>
                    </td>
                    <td key={user._id.toString() + 'e'} style={styles.btn}>
                      <Button
                        onClick={() => setFindUser(user._id)}
                        id={user._id}
                        size="sm"
                        className="shadow-none"
                      >
                        User Info
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
    color: colors.darkGrey,
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
    padding: '10px',
  },
};
