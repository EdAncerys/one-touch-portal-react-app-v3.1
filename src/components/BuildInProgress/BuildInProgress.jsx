import React from 'react';

import NDGBanner from '../NDGBanner';

export default function BuildInProgress({ props }) {
  return (
    <div style={styles.container}>
      <div>
        <h4>Coming Soon...</h4>
        <NDGBanner width="flex-container-50" />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    gap: '5px',
    height: '100%',
  },
};
