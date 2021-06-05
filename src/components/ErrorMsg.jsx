import React, { useContext } from "react";
import { Alert, Button } from "react-bootstrap";
import { AppContext } from "../App";

export default function ErrorMsg({ color, msg }) {
  const { manageAppContext } = useContext(AppContext);

  let variantColor = "danger";
  if (variantColor === "warning") variantColor = "warning";
  if (variantColor === "success") variantColor = "success";

  return (
    <div style={styles.container}>
      <div>
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
    </div>
  );
}

const styles = {
  container: {
    position: "absolute",
    left: 0,
    right: 0,
    marginLeft: "auto",
    marginRight: "auto",
    maxWidth: "1000px",
    padding: "0 3%",
    opacity: "0.8",
    top: "100px",
    zIndex: "99",
  },
};
