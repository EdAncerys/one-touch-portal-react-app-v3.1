import React from 'react';

import NDGBanner from '../NDGBanner';
import TicketCard from './TicketCard';
import TicketOverviewCard from './TicketOverviewCard';

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

      <div className="flex-container-60">
        <TicketCard filterTicket={filterTicket} setID={setID} />
      </div>
    </div>
  );
}
