import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function TicketOverviewCard({ setFilterTicket }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let totalTickets = pageData.length;
  let openTickets = 0;
  let pendingTickets = 0;
  let resolvedTickets = 0;
  let closedTickets = 0;

  pageData.map((ticket) => {
    const ticketStatus = ticket.status;

    if (ticketStatus === 2) {
      openTickets += 1;
    }
    if (ticketStatus === 3) {
      pendingTickets += 1;
    }
    if (ticketStatus === 4) {
      resolvedTickets += 1;
    }
    if (ticketStatus === 5) {
      closedTickets += 1;
    }

    return pageData;
  });

  return (
    <div>
      <Card bg="Light" text="dark" style={{ width: '100%' }} className="mb-2">
        <Card.Header>
          <div>Portal Ticket Overview Information</div>
          <div style={styles.bottomRow}>Manage tickets - anytime, anywhere</div>
        </Card.Header>
        <Card.Body>
          <Table bordered hover size="sm">
            <tbody>
              <tr onClick={() => setFilterTicket(false)} className="cursor-on">
                <td>Total Tickets</td>
                <td>{totalTickets}</td>
              </tr>
              <tr
                onClick={() => setFilterTicket('pending-tickets')}
                className="cursor-on"
                style={{ background: colors.bgSET }}
              >
                <td>Pending Tickets</td>
                <td>{pendingTickets}</td>
              </tr>
              <tr
                onClick={() => setFilterTicket('open-tickets')}
                className="cursor-on"
                style={{ background: colors.bgSTOP }}
              >
                <td>Open Tickets</td>
                <td>{openTickets}</td>
              </tr>
              <tr
                onClick={() => setFilterTicket('resolved-tickets')}
                className="cursor-on"
                style={{ background: colors.bgGO }}
              >
                <td>Resolved Tickets</td>
                <td>{resolvedTickets}</td>
              </tr>
              <tr
                onClick={() => setFilterTicket('closed-tickets')}
                className="cursor-on"
                style={{ background: colors.bgPENDING }}
              >
                <td>Closed Tickets</td>
                <td>{closedTickets}</td>
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
