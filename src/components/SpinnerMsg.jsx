import React from 'react';
import { Spinner } from 'react-bootstrap';

import { colors } from '../config/colors';

export default function SpinnerMsg({ spinner }) {
  return (
    <div style={styles.spinnerContainer}>
      <div style={styles.spinnerWrapper}>
        <Spinner animation="border" role="status"></Spinner>
        <span>Loading...</span>
      </div>
    </div>
  );
}

const styles = {
  spinnerContainer: {
    position: 'absolute',
    width: '100vw',
    height: '100vh',
    zIndex: '999',
    background: colors.bgGO,
  },
  spinnerWrapper: {
    position: 'relative',
    marginTop: '40%',
    marginLeft: '50%',
  },
};
