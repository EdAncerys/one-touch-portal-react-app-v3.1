import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table, Button } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function TicketCard({ filterTicket, setID }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;

  return (
    <div style={styles.container}>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>Raised Tickets</div>
        </Card.Header>
        <Card.Body>
          <Table responsive bordered hover size="sm">
            <thead>
              <tr>
                <th>#</th>
                <th>Ticket Subject</th>
                <th>Created & due by</th>
                <th>More</th>
              </tr>
            </thead>
            <tbody>
              {pageData.map((ticket, index) => {
                const ticketStatus = ticket.status;

                let ticketVisibility = 'pending';
                let userStatus = 'pending';
                let bgColor = colors.bgPENDING;

                if (ticketStatus === 2) {
                  bgColor = colors.bgSTOP;
                  userStatus = 'open-tickets';
                }
                if (ticketStatus === 3) {
                  bgColor = colors.bgSET;
                  userStatus = 'pending-tickets';
                }
                if (ticketStatus === 4) {
                  bgColor = colors.bgGO;
                  userStatus = 'resolved-tickets';
                }
                if (ticketStatus === 5) {
                  bgColor = colors.bgPENDING;
                  userStatus = 'closed-tickets';
                }
                if (filterTicket !== userStatus && filterTicket)
                  ticketVisibility = 'hidden';

                return (
                  <tr
                    style={{ background: bgColor }}
                    className={ticketVisibility}
                    key={ticket.id.toString()}
                  >
                    <td key={ticket.id.toString() + 'a'}>{index + 1}</td>
                    <td key={ticket.id.toString() + 'b'}>
                      <div key={index + 1}>{ticket.subject}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {ticket.updated_at}
                      </div>
                    </td>
                    <td key={ticket.id.toString() + 'c'}>
                      <div key={index + 1}>{ticket.created_at}</div>
                      <div key={index + 2} style={styles.bottomRow}>
                        {ticket.due_by}
                      </div>
                    </td>
                    <td
                      key={ticket.id.toString() + 'd'}
                      style={styles.btnComponent}
                    >
                      <Button
                        onClick={() => setID(ticket.id)}
                        id={ticket.id}
                        size="sm"
                        className="shadow-none"
                        style={styles.btn}
                      >
                        Ticket Info
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
  btnComponent: {
    textAlign: 'center',
    padding: '10px',
  },
  btn: {
    margin: '0 5px',
  },
};
