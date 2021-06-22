import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import { colors } from '../../config/colors';

export default function CustomerInfoCard({ ticket, setID, setTicket }) {
  const { manageAppContext } = useContext(AppContext);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;

  const status = ticket.status;

  // async function deleteCustomer() {
  //   setSpinner(true);
  //   const access_token = manageAppContext.accessToken.access_token;
  //   const URL = '/.netlify/functions/mongoDB';

  //   try {
  //     const body = {
  //       oneTouchPath: 'deleteCustomer',
  //       access_token,
  //       id: id,
  //     };
  //     console.log(body);

  //     const config = {
  //       method: 'POST',
  //       body: JSON.stringify(body),
  //     };
  //     const response = await fetch(URL, config);
  //     const ticketData = await response.json();

  //     if (!response.ok) {
  //       setSpinner(false);
  //       manageAppContext.setAlert({ color: 'warning', msg: ticketData.msg });
  //       console.log(ticketData);
  //       return;
  //     }

  //     const updateData = pageData.filter(
  //       (customer) => customer._id !== findCustomer
  //     );

  //     setSpinner(false);
  //     setFindCustomer(false);
  //     manageAppContext.setPageData(updateData);
  //     manageAppContext.setAlert({ color: 'success', msg: ticketData.msg });
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  return (
    <>
      <div className="features-align-right">
        <div style={styles.btnClose}>
          <Button
            onClick={() => {
              setTicket(false);
              setID(false);
            }}
            variant="outline-dark"
            size="sm"
          >
            <span aria-hidden="true">×</span>
          </Button>
        </div>
      </div>

      <div className="features">
        <div className="flex-container-30">
          <Card style={styles.manageCard} className="mb-2">
            <Card.Header>
              <div>Manage Ticket</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td style={styles.manageCard}>Delete Customer</td>
                    <td style={styles.btn}>
                      <Button
                        // onClick={() => deleteCustomer()}
                        variant="outline-danger"
                        size="sm"
                      >
                        Delete Customer
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <NDGBanner width="flex-container-30" />
        </div>
      </div>
    </>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
    color: colors.darkGrey,
  },
  manageCard: {
    color: colors.white,
  },
  btnClose: {
    padding: '5px',
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
  },
};
