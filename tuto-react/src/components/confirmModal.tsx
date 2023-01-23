import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from "@material-ui/core";
import { Button, Divider, Fade, Grid, IconButton } from "@mui/material";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";

export default function ConfirmDialog(props: any) {
  const { confirmDialog, setConfirmDialog, deleteFunction } = props;

  const styleText = {
    color: "#00008C",
  };
  const stylesubTitle = {
    color: "#00008C",
    padding: '20 50 10 40',
  };
  return (
    <>
    <Dialog open={confirmDialog.isOpen}>
      <DialogTitle style={{ fontFamily: "Barlow", color: "#00008C" }}>
        <IconButton style={styleText}>
          <PersonRemoveIcon />
        </IconButton>
        {confirmDialog.title}
      </DialogTitle>
      <Divider light />

      <DialogContent style={stylesubTitle}>
        <Typography variant="subtitle2" >{confirmDialog.subTitle}</Typography>
      </DialogContent>
      <DialogActions>
        <Button
          value="No"
          style={{textTransform: 'capitalize'}}
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          {" "}
          Annuler
        </Button>
        <Button
          value="Yes"
          onClick={deleteFunction}
          color="error"
          style={{ borderRadius: 50,textTransform: 'capitalize' }}
          variant="contained"
        >
          {" "}
          Supprimer
        </Button>
      </DialogActions>
    </Dialog></>
  );
}
