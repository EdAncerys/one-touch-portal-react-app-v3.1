import React from 'react';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';
import ContractOverviewCard from './ContractOverviewCard';

export default function LiveContractComponent({
  pageData,
  setFindContract,
  filterContract,
  setFilterContract,
}) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <ContractOverviewCard
          pageData={pageData}
          setFilterContract={setFilterContract}
          width="flex-container-30"
        />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <ContractCard
          pageData={pageData}
          filterContract={filterContract}
          setFindContract={setFindContract}
        />
      </div>
    </div>
  );
}
