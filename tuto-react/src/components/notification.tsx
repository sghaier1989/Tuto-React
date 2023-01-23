import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert, AlertTitle, Grid, TextField } from "@mui/material";

function Notification({ ...props }) {
  const { notify, setNotify } = props;

  const handleClose = (event: any, reason: any) => {
    if (reason === "clickaway") {
      return;
    }
    setNotify({
      ...notify,
      isOpenNotify: false,
    });
  };

  return (
    <Snackbar
      style={{ backgroundColor: "#FFFFFF" }}
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={notify.isOpenNotify}
      autoHideDuration={3000}
      onClose={handleClose}
    >
      <Alert
        style={{
          backgroundColor: "#FFFFFF",
          color: "#00008C",
          border: "2px #00008C",
          boxShadow: "0px 12px 24px rgba(102, 109, 146, 0.2)",
          borderRadius: "8px",
        }}
      >
        <AlertTitle style={{ color: "#00008C" }}>
          <strong>{notify.type}</strong>
        </AlertTitle>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
