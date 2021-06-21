import React from 'react';

import NDGBanner from '../NDGBanner';
import TicketCard from './TicketCard';
import TicketOverviewCard from './TicketOverviewCard';

export default function RaiseTicketComponent({
  setFindTicket,
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
        <TicketCard filterTicket={filterTicket} setFindTicket={setFindTicket} />
      </div>
    </div>
  );
}
