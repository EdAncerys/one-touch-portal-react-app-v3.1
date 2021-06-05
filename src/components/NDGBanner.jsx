import React from 'react';

import NDGLogo from '../img/NDG/NDG-Logo.png';

export default function Index({ props }) {
  const width = '200px';
  const className = 'd-inline-block align-top index-icon';

  return (
    <div style={styles.container} className="features">
      <h4>Coming Soon...</h4>
      <div style={styles.logo}>
        <img src={NDGLogo} width={width} className={className} alt={NDGLogo} />
      </div>
      <p>Unit 4, Saddlers Court, Oakham LE15 7GH</p>
      <p>Phone: 024 7509 2481</p>
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
  },
  logoContainer: {
    display: 'grid',
    justifyContent: 'center',
  },
};
