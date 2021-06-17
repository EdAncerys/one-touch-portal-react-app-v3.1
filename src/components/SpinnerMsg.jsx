import React from 'react';

import OneTouchIcon from '../img/oneTouch/One-Touch-Icon.png';
import { colors } from '../config/colors';

export default function SpinnerMsg({ spinner }) {
  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <div style={styles.spinner}>
          <img src={OneTouchIcon} style={styles.icon} alt={OneTouchIcon} />
        </div>
        <span style={styles.txt}>Loading...</span>
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
    color: colors.darkGrey,
    background: colors.bgSpinner,
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
  icon: {
    animation: '2.75s linear infinite spinner-border',
    width: '80px',
  },
  txt: {
    fontSize: '36px',
  },
};
