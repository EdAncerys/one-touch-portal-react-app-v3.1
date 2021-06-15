import React from 'react';
import { Spinner } from 'react-bootstrap';

import { colors } from '../config/colors';

export default function SpinnerMsg({ spinner }) {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.spinner}>
          <Spinner animation="border" role="status"></Spinner>
        </div>
        <span>Loading...</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'absolute',
    width: '100%',
    minHeight: '100%',
    zIndex: '999',
    color: colors.danger,
    // background: colors.bgGO,
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr auto',
    gap: '10px',
    justifyContent: 'center',
    marginTop: '30vh',
  },
  spinner: {
    display: 'grid',
    justifyContent: 'center',
  },
};
