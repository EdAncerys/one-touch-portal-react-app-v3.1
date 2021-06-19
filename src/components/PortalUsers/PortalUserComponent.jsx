import React from 'react';

import NDGBanner from '../NDGBanner';
import UserCard from './UserCard';
import UserOverviewCard from './UserOverviewCard';

export default function PortalUserComponent({
  setFindUser,
  filterUser,
  setFilterUser,
}) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <UserOverviewCard
          filterUser={filterUser}
          setFilterUser={setFilterUser}
        />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <UserCard filterUser={filterUser} setFindUser={setFindUser} />
      </div>
    </div>
  );
}
