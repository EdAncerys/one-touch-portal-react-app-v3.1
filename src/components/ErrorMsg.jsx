import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import { AppContext } from "../App";

export default function ErrorMsg({ color, msg }) {
  const { manageAppContext } = useContext(AppContext);

  let variantColor = "danger";
  if (variantColor === "warning") variantColor = "warning";
  if (variantColor === "success") variantColor = "success";

  return (
    <div className="features">
      <div className="flex-container-100">
        <Alert
          variant={variantColor}
          onClose={() => manageAppContext.setAlert(false)}
          dismissible
        >
          <Alert.Heading>{msg}</Alert.Heading>
        </Alert>
      </div>
    </div>
  );
}
