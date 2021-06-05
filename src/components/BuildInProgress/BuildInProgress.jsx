import React from 'react';

import NDGBanner from '../NDGBanner';

export default function BuildInProgress({ props }) {
  return (
    <div style={styles.container}>
      <NDGBanner width="flex-container-50" />
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    alignItems: 'center',
    height: '100%',
  },
};
