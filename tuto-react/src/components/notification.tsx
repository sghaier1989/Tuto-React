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
      anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
      open={notify.isOpenNotify}
      autoHideDuration={5000}
      onClose={handleClose}
    >
      <Alert severity="success">
        <AlertTitle>
          <strong>Success</strong>
        </AlertTitle>
        {notify.message}
      </Alert>
    </Snackbar>
  );
}

export default Notification;
