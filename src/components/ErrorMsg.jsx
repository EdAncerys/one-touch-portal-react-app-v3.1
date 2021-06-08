import React, { useContext } from 'react';
import { Alert, Button } from 'react-bootstrap';
import { AppContext } from '../App';

export default function ErrorMsg({ color, msg }) {
  const { manageAppContext } = useContext(AppContext);

  let variantColor = 'danger';
  if (color === 'warning') variantColor = 'warning';
  if (color === 'success') variantColor = 'success';

  return (
    <div style={styles.container}>
      <Alert variant={variantColor}>
        <Alert.Heading>{msg}</Alert.Heading>
        <hr />
        <div className="d-flex justify-content-end">
          <Button
            onClick={() => manageAppContext.setAlert(false)}
            variant={variantColor}
          >
            Close
          </Button>
        </div>
      </Alert>
    </div>
  );
}

const styles = {
  container: {
    position: '-webkit-sticky',
    position: 'sticky',
    top: '150px',
    height: 0,
    overflow: 'visible',
    marginLeft: 'auto',
    marginRight: 'auto',
    maxWidth: '1000px',
    padding: '0 3%',
    zIndex: '99',
    top: '100px',
    opacity: '0.9',
  },
};
