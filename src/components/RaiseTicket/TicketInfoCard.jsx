import React, { useContext, useState } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button, Form } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import { colors } from '../../config/colors';

export default function TicketInfoCard({
  ticket,
  id,
  setID,
  setTicket,
  findTicket,
}) {
  const { manageAppContext } = useContext(AppContext);
  const [replyMsg, setReplyMsg] = useState(false);

  const setSpinner = manageAppContext.setSpinner;
  const setAlert = manageAppContext.setAlert;
  const pageData = manageAppContext.pageData;
  const setPageData = manageAppContext.setPageData;
  let conversationLength = 0;

  const subject = ticket[0].subject;
  const description = ticket[0].description_text;
  const conversation = ticket[1];
  const ticketStatus = ticket[0].status;

  let bgColor = colors.bgPENDING;
  if (ticketStatus === 2) bgColor = colors.bgSTOP;
  if (ticketStatus === 3) bgColor = colors.bgSET;
  if (ticketStatus === 4) bgColor = colors.bgGO;
  if (ticketStatus === 5) bgColor = colors.bgPENDING;

  async function deleteTicket() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/freshDesk';

    try {
      const body = {
        oneTouchPath: 'deleteTicket',
        access_token,
        id,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        setSpinner(false);
        setAlert({ msg: data.msg });
        console.log(data);
        return;
      }

      const updateTicketData = pageData.filter((tickets) => tickets.id !== id);

      setSpinner(false);
      setAlert({ color: 'success', msg: data.msg });
      setPageData(updateTicketData);
      setTicket(false);
      setID(false);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

  async function ticketReply() {
    setSpinner(true);
    const access_token = manageAppContext.accessToken.access_token;
    const URL = '/.netlify/functions/freshDesk';

    try {
      const body = {
        oneTouchPath: 'ticketReply',
        access_token,
        replyMsg,
        id,
      };
      console.log(body);

      const config = {
        method: 'POST',
        body: JSON.stringify(body),
      };
      const response = await fetch(URL, config);
      const data = await response.json();

      if (!response.ok) {
        setSpinner(false);
        setAlert({ msg: data.msg });
        console.log(data);
        return;
      }

      setSpinner(false);
      setAlert({ color: 'success', msg: data.msg });
      const replyResponse = true;
      findTicket(replyResponse);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  }

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
                        onClick={() => deleteTicket()}
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

        <div className="flex-container-70">
          <Card className="mb-2">
            <Card.Header>
              <div>{subject}</div>
              <div>Ticket ID: {id}</div>
            </Card.Header>
            <Card.Body>
              <Table bordered hover size="sm">
                <tbody>
                  <tr style={{ background: bgColor }}>
                    <td>
                      <div>#</div>
                    </td>
                    <td>
                      <div>{description}</div>
                    </td>
                  </tr>
                </tbody>
                <tbody>
                  {conversation.map((ticket, index) => {
                    conversationLength += 1;
                    console.log(conversationLength);
                    let textAlign = 'end';
                    if (conversationLength % 2) textAlign = 'start';

                    return (
                      <tr
                        style={{ background: bgColor }}
                        key={ticket.id.toString()}
                      >
                        <td key={ticket.id.toString() + 'a'}>{index + 1}</td>
                        <td key={ticket.id.toString() + 'b'}>
                          <div
                            style={{
                              textAlign: textAlign,
                            }}
                            key={index + 1}
                          >
                            {ticket.body_text}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </Table>

              <Form.Group className="mt-3">
                <Form.Control
                  onChange={(e) => setReplyMsg(e.target.value)}
                  id="description"
                  as="textarea"
                  placeholder="Reply To The Ticket"
                  style={{ height: '150px' }}
                />
              </Form.Group>

              <div className="divider"></div>
              <Button
                onClick={() => ticketReply()}
                variant="primary"
                className="shadow-none"
                style={{ width: '100%' }}
              >
                Replay
              </Button>
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
    textAlign: 'left',
  },
};
