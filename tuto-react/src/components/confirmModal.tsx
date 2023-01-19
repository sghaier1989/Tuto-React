import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { Button, Fade, Grid, IconButton } from "@mui/material";

export default function ConfirmDialog(props: any) {
  const { confirmDialog, setConfirmDialog, deleteFunction } = props;

  return (
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle>
        <IconButton></IconButton>
        {confirmDialog.title}
      </DialogTitle>
      <DialogContent>
        <Typography variant="h6"></Typography>
        <Typography variant="subtitle2">{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          value="No"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          {" "}
          Annuler
        </Button>
        <Button
          value="Yes"
          onClick={deleteFunction}
          color="error"
          style={{ borderRadius: 50 }}
          variant="contained"
        >
          {" "}
          Supprimer
        </Button>
      </DialogActions>
    </Dialog>
  );
}
