import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import { Box, Grid, InputLabel, Snackbar, TextField } from "@material-ui/core";
import { Alert } from "@mui/material";

const initialValues = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  acceptTerms: false,
};

const handleSubmit = (values: any) => {
  console.log(values);
};

function FormUser(props: any) {
  const { open, handleClose, data, onChange, handleFormSubmit } = props;
  const { id, firstName, email, lastName } = data;

  return (
    <div>
      <div>
        <Dialog
          open={open}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {id ? "Modifier un utilisateur" : "Ajouter un utilisateur"}
          </DialogTitle>
          <DialogContent>
            <form>
              <Box sx={{ flexGrow: 1 }}>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Nom
                    </InputLabel>
                    <TextField
                      id="firstName"
                      value={firstName}
                      onChange={(e) => onChange(e)}
                      placeholder="Enter firstname"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Prenom
                    </InputLabel>
                    <TextField
                      id="lastName"
                      value={lastName}
                      onChange={(e) => onChange(e)}
                      placeholder="Enter lastname"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <InputLabel htmlFor="input-with-icon-adornment">
                      Email
                    </InputLabel>
                    <TextField
                      id="email"
                      value={email}
                      onChange={(e) => onChange(e)}
                      placeholder="Enter email"
                      variant="outlined"
                      margin="dense"
                      fullWidth
                    />
                  </Grid>
                </Grid>
              </Box>
            </form>
          </DialogContent>
          <DialogActions>
            <Button color="inherit" variant="text" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              color="primary"
              variant="contained"
              style={{ borderRadius: 30 }}
              onClick={() => handleFormSubmit()}
            >
              {id ? "Modifier" : "Ajouter"}
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default FormUser;
