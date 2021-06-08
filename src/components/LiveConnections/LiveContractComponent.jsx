import React, { useContext } from 'react';
import { AppContext } from '../../App';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';
import ContractOverviewCard from './ContractOverviewCard';
import OrderOverviewCard from '../BroadbandOrders/OrderOverviewCard';

export default function LiveContractComponent({
  setFindContract,
  filterContract,
  setFilterContract,
}) {
  const { manageAppContext } = useContext(AppContext);

  const page = manageAppContext.page;

  return (
    <div className="features">
      <div className="flex-container-30">
        {page === 'live-connections' && (
          <ContractOverviewCard setFilterContract={setFilterContract} />
        )}
        {page === 'broadband-orders' && (
          <OrderOverviewCard setFilterContract={setFilterContract} />
        )}

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
