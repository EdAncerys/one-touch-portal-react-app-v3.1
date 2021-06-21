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
        <span style={styles.txt}>loading...</span>
      </div>
    </div>
  );
}

const styles = {
  container: {
    position: 'sticky',
    height: 0,
    overflow: 'visible',
    marginLeft: 'auto',
    marginRight: 'auto',
    zIndex: '999',
    top: '0px',
  },
  wrapper: {
    display: 'grid',
    gridTemplateRows: '1fr 100vh',
    gap: '10px',
    paddingTop: '200px',
    marginBottom: '0px',
    justifyContent: 'center',
    color: colors.bgPENDING,
    background: colors.bgSpinner,
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
