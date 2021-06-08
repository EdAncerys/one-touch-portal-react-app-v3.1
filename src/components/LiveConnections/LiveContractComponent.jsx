import React from 'react';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';
import ContractOverviewCard from './ContractOverviewCard';

export default function LiveContractComponent({
  setFindContract,
  filterContract,
  setFilterContract,
}) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <ContractOverviewCard setFilterContract={setFilterContract} />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <ContractCard
          filterContract={filterContract}
          setFindContract={setFindContract}
        />
      </div>
    </div>
  );
}
