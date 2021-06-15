import React from 'react';

import NDGBanner from '../NDGBanner';

export default function BuildInProgress({ props }) {
  return (
    <div style={styles.container}>
      <div className="features">
        <h4>Coming Soon...</h4>
        <NDGBanner width="flex-container-50" mobile={true} />
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: 'grid',
    textAlign: 'center',
    marginTop: '20%',
  },
};
