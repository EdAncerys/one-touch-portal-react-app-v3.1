import React from 'react';

import NDGLogo from '../img/NDG/NDG-Logo.png';

export default function Index({ css }) {
  const height = '100px';
  const className = 'd-inline-block align-top index-icon';

  let defClass = 'flex-container-30 NDG-banner';
  if (css) defClass = css;

  return (
    <div className={defClass}>
      <div style={styles.container}>
        <div style={styles.logo}>
          <img
            src={NDGLogo}
            height={height}
            className={className}
            alt={NDGLogo}
          />
        </div>
        <div style={styles.text}>
          <div>Unit 4, Saddlers Court, Oakham LE15 7GH</div>
          <div>Phone: 024 7509 2481</div>
        </div>
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
  },
  logoContainer: {
    display: 'grid',
    justifyContent: 'center',
  },
  text: {
    fontSize: '12px',
  },
};
