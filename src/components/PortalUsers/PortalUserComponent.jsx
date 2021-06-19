import React from 'react';

import NDGBanner from '../NDGBanner';
import UserCard from './UserCard';
import UserOverviewCard from './UserOverviewCard';

export default function PortalUserComponent({
  setFindContract,
  filterContract,
  setFilterContract,
}) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <UserOverviewCard setFilterContract={setFilterContract} />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <UserCard
          filterContract={filterContract}
          setFindContract={setFindContract}
        />
      </div>
    </div>
  );
}
