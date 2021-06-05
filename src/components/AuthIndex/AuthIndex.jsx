import React, { useContext } from "react";
import { AppContext } from "../../App";

import Login from "./Login";
import CreateNewAccount from "./CreateNewAccount";

export default function AuthIndex({ props }) {
  const { manageAppContext } = useContext(AppContext);
  const page = manageAppContext.page;
  const accessToken = manageAppContext.accessToken;

  return (
    <div style={styles.container}>
      {((!accessToken && !page) || page === "login") && <Login />}
      {page === "create-new-account" && <CreateNewAccount />}
    </div>
  );
}

const styles = {
  container: {
    display: "grid",
    alignItems: "center",
    height: "100%",
  },
};
