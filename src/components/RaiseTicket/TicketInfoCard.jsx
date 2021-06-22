import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import { colors } from '../../config/colors';

export default function TicketInfoCard({ ticket, id, setID, setTicket }) {
  const { manageAppContext } = useContext(AppContext);

  const setSpinner = manageAppContext.setSpinner;
  const pageData = manageAppContext.pageData;
  const subject = ticket[0].subject;
  const conversation = ticket[1];
  const ticketStatus = ticket[0].status;

  let bgColor = colors.bgPENDING;
  if (ticketStatus === 2) bgColor = colors.bgSTOP;
  if (ticketStatus === 3) bgColor = colors.bgSET;
  if (ticketStatus === 4) bgColor = colors.bgGO;
  if (ticketStatus === 5) bgColor = colors.bgPENDING;

  console.log(conversation);

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
          <Card style={{ background: bgColor }} className="mb-2">
            <Card.Header>
              <div>Manage Ticket</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr>
                    <td style={styles.btn}>
                      <Button
                        // onClick={() => deleteCustomer()}
                        variant="outline-danger"
                        size="sm"
                      >
                        Delete Ticket
                      </Button>
                    </td>
                  </tr>
                </tbody>
              </Table>
            </Card.Body>
          </Card>
          <NDGBanner width="flex-container-30" />
        </div>

        <div className="flex-container-60">
          <Card className="mb-2">
            <Card.Header>
              <div>{subject}</div>
              <div>Ticket ID: {id}</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  {conversation.map((ticket, index) => {
                    return (
                      <tr
                        style={{ background: bgColor }}
                        key={ticket.id.toString()}
                      >
                        <td key={ticket.id.toString() + 'a'}>{index + 1}</td>
                        <td key={ticket.id.toString() + 'b'}>
                          <div key={index + 1}>{ticket.body_text}</div>
                        </td>
                      </tr>
                    );
                  })}
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
  bottomRow: {
    fontSize: '12px',
    color: colors.darkGrey,
  },
  btnClose: {
    padding: '5px',
  },
  btn: {
    textAlign: 'center',
    margin: 'auto',
  },
};
