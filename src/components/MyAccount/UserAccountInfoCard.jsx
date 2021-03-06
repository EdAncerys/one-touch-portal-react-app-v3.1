import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function UserAccountInfoCard({
  findUser,
  setFindUser,
  setSelectedAddress,
  setUpdateAccount,
  updateAccountStatus,
  deleteUserAccount,
}) {
  const { manageAppContext } = useContext(AppContext);
  const portalUsers = manageAppContext.page === 'portal-users';
  let pageData = manageAppContext.pageData[0].oneTouchSuperUser;
  if (findUser)
    pageData = manageAppContext.pageData.filter(
      (user) => user._id === findUser
    )[0].oneTouchSuperUser;

  console.log(pageData);
  const userApproved = pageData.userApproved;
  let name = '';
  if (pageData.fName) name = pageData.fName + `'s`;

  return (
    <>
      <div className="features">
        <div className="flex-container-50">
          <Card
            bg="Light"
            text="dark"
            style={{ width: '100%' }}
            className="mb-2"
          >
            <Card.Header>
              <div>{name} Account Information</div>
            </Card.Header>
            <Card.Body>
              <Table hover responsive="sm">
                <tbody>
                  <tr>
                    <td>Name:</td>
                    <td>{pageData.fName}</td>
                  </tr>
                  <tr>
                    <td>Last Name:</td>
                    <td>{pageData.lName}</td>
                  </tr>
                  <tr>
                    <td>Email:</td>
                    <td>{pageData.email}</td>
                  </tr>
                  <tr>
                    <td>Phone Number:</td>
                    <td>{pageData.phoneNumber}</td>
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
              <div>{name} Company Information</div>
            </Card.Header>
            <Card.Body>
              <Table hover responsive="sm">
                <tbody>
                  <tr>
                    <td>Company Name:</td>
                    <td>{pageData.companyName}</td>
                  </tr>
                  <tr>
                    <td>Product Type:</td>
                    <td>{pageData.productType}</td>
                  </tr>
                  <tr>
                    <td>Company Email:</td>
                    <td>{pageData.companyEmail}</td>
                  </tr>
                  <tr>
                    <td>Company Phone Number:</td>
                    <td>{pageData.companyPhoneNumber}</td>
                  </tr>
                  <tr>
                    <td>Company Address:</td>
                    <td>
                      {pageData.thoroughfare_number === 'null'
                        ? ''
                        : pageData.thoroughfare_number}{' '}
                      {pageData.premises_name === 'null'
                        ? ''
                        : pageData.premises_name}{' '}
                      {pageData.sub_premises === 'null'
                        ? ''
                        : pageData.sub_premises}{' '}
                      {pageData.thoroughfare_name === 'null'
                        ? ''
                        : pageData.thoroughfare_name}{' '}
                      {pageData.county === 'null' ? '' : pageData.county}{' '}
                      {pageData.postcode}
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="features-align-left">
        <div className="flex-container-50">
          <Card
            style={{
              ...styles.manageCard,
              background: userApproved ? colors.bgGO : colors.bgPENDING,
            }}
            className="mb-2"
          >
            <Card.Header>
              <div>Manage Customer Account</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr className="row-collapse">
                    {!portalUsers && (
                      <td style={styles.cardText}>Update Account Details</td>
                    )}
                    <td style={styles.btn}>
                      <Button
                        onClick={() => {
                          setSelectedAddress(false);
                          setUpdateAccount(true);
                        }}
                        variant="warning"
                        size="sm"
                        className="shadow-none mobile-full-width"
                      >
                        Update Account Details
                      </Button>
                    </td>
                    {portalUsers && (
                      <>
                        <td style={styles.btn}>
                          <Button
                            onClick={() => deleteUserAccount()}
                            variant="danger"
                            size="sm"
                            className="shadow-none mobile-full-width"
                          >
                            Delete Account
                          </Button>
                        </td>
                        <td style={styles.btn}>
                          <Button
                            onClick={() => updateAccountStatus(true)}
                            variant="outline-success"
                            size="sm"
                            className="shadow-none mobile-full-width"
                          >
                            Activate
                          </Button>
                        </td>
                        <td style={styles.btn}>
                          <Button
                            onClick={() => updateAccountStatus(false)}
                            variant="outline-danger"
                            size="sm"
                            className="shadow-none mobile-full-width"
                          >
                            Deactivate
                          </Button>
                        </td>
                        <td style={styles.btn}>
                          <Button
                            onClick={() => setFindUser(false)}
                            variant="outline-primary"
                            size="sm"
                            className="shadow-none mobile-full-width"
                          >
                            Go Back
                          </Button>
                        </td>
                      </>
                    )}
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      </div>
    </>
  );
}

const styles = {
  manageCard: {
    color: colors.white,
  },
  cardText: {
    color: colors.white,
  },
  btn: {
    textAlign: 'center',
  },
};
