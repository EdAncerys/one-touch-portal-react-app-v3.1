import React, { useContext } from 'react';
import { AppContext } from '../../App';
import { Card, Table } from 'react-bootstrap';

import { colors } from '../../config/colors';

export default function TicketOverviewCard({ setFilterTicket }) {
  const { manageAppContext } = useContext(AppContext);

  const pageData = manageAppContext.pageData;
  let totalTickets = pageData.length;
  let closedTickets = 0;
  let openTickets = 0;

  pageData.map((user) => {
    const userApproved = user.oneTouchSuperUser.userApproved;

    if (!userApproved) {
      closedTickets += 1;
    }
    if (userApproved) {
      openTickets += 1;
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
                onClick={() => setFilterTicket('open-ticket')}
                className="cursor-on"
                style={{ background: colors.bgSTOP }}
              >
                <td>Open Ticket</td>
                <td>{openTickets}</td>
              </tr>
              <tr
                onClick={() => setFilterTicket('closed-ticket')}
                className="cursor-on"
                style={{ background: colors.bgGO }}
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
