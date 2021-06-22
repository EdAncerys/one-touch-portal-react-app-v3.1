import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';

import NDGBanner from '../NDGBanner';
import TicketCard from './TicketCard';
import TicketOverviewCard from './TicketOverviewCard';
import RaiseTicketFormComponent from './RaiseTicketFormComponent';

export default function RaiseTicketComponent({
  setID,
  filterTicket,
  setFilterTicket,
}) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <TicketOverviewCard setFilterTicket={setFilterTicket} />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="profile" title="Tickets">
            <TicketCard filterTicket={filterTicket} setID={setID} />
          </Tab>
          <Tab eventKey="home" title="Raise a Ticket">
            <RaiseTicketFormComponent />
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}
