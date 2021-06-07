import React from 'react';
import { Card, Table } from 'react-bootstrap';
import colors from '../../config/colors';

import NDGBanner from '../NDGBanner';
import ContractCard from './ContractCard';
import ContractOverviewCard from './ContractOverviewCard';

export default function LiveContractComponent({ pageData, setFindContract }) {
  return (
    <div className="features">
      <div className="flex-container-30">
        <ContractOverviewCard pageData={pageData} width="flex-container-30" />
        <NDGBanner width="flex-container-30" />
      </div>

      <div className="flex-container-70">
        <ContractCard pageData={pageData} setFindContract={setFindContract} />
      </div>
    </div>
  );
}

const styles = {
  bottomRow: {
    fontSize: '12px',
    color: colors.darkGrey,
  },
};
