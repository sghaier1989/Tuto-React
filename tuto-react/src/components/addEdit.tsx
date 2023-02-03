import React, { useEffect, useState } from "react";
import { Formik, Field, Form } from "formik";
import Notification from "./notification";
import EditIcon from "@mui/icons-material/Edit";
import PersonAdd from "@mui/icons-material/PersonAdd";

import userService from "../service/UserService";
import * as Yup from "yup";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Grid,
  IconButton,
  InputLabel,
  TextField,
} from "@mui/material";
import { LoadingButton } from "@mui/lab";

function AddEdit(props: any) {
  const { open, handleClose, data, handleFormSubmit } = props;
  const [notify, setNotify] = useState({
    isOpenNotify: false,
    message: "",
    type: "",
  });

  const [isloading, setIsloading] = useState(false);

  const defaultValues = {
    firstName: "",
    lastName: "",
    email: "",
  };

  const [initalValues, setInitialValues] = useState(defaultValues);

  const validationSchema = Yup.object().shape({
    lastName: Yup.string()
      .min(2, "trop petit")
      .max(20, "trop long!")
      .required("Ce champ est obligatoire"),
    firstName: Yup.string()
      .min(2, "trop petit")
      .max(20, "trop long!")
      .required("Ce champ est obligatoire"),
    email: Yup.string().required("Please enter email").email("Invalid email"),
  });

  function createUser(fields: any, formikHelpers: any) {
    let messageNotif = "",
      typeNotif = "";
    setIsloading(true);
    if (typeof data.id === "undefined") {
      userService.creatUsers(fields).then((response) => {
        messageNotif = "L’utilisateur a été ajouté avec succès ";
        typeNotif = "success";
        if (response.status !== 201) {
          messageNotif = "La suppression de l’utilisateur a échoué";
          typeNotif = "error";
        }
        handleClose();

        handleFormSubmit();
        setInitialValues(defaultValues);
        setNotify({
          isOpenNotify: true,
          message: messageNotif,
          type: typeNotif,
        });
        setIsloading(false);
        formikHelpers.resetForm();

        return true;
      });
    } else {
      const id = data.id;
      userService.updateUsers({ id, ...fields }).then((response) => {
        messageNotif = "La modification de l’utilisateur a échoué ";
        typeNotif = "error";
        if (response.status === 200 || response.status === 201) {
          messageNotif = "L’utilisateur a été modifié avec succè";
          typeNotif = "success";
        }

        handleClose();
        formikHelpers.resetForm();
        handleFormSubmit();
        setInitialValues(defaultValues);
        setNotify({
          isOpenNotify: true,
          message: messageNotif,
          type: typeNotif,
        });
        setIsloading(false);
      });

      return true;
    }
  }

  function handleModalClose() {
    handleClose();
    setInitialValues(defaultValues);
  }

  async function fetchUser(id: any) {
    await userService.findUser(id).then((user) => {
      //const updatedUser = Promise.resolve(user.data)
      setInitialValues(user.data);
    });
  }

  useEffect(() => {
    if (data.id) {
      fetchUser(data.id);
    }
  }, [data]);

  return (
    <>
      <Formik
        initialValues={initalValues}
        validationSchema={validationSchema}
        onSubmit={(fields, formikHelpers) => {
          createUser(fields, formikHelpers);
        }}
        enableReinitialize
      >
        {({
          errors,
          touched,
          isValid,
          dirty,
          resetForm,
          isSubmitting,
          setFieldValue,
          handleReset,
        }) => {
          return (
            <Dialog
              open={open}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <Form>
                <DialogTitle
                  id="alert-dialog-title"
                  style={{ color: "#00008C" }}
                >
                  <IconButton style={{ color: "#00008C" }}>
                    {data.id ? <EditIcon /> : <PersonAdd />}
                  </IconButton>
                  <strong>
                    {data.id
                      ? "Modifier un utilisateur"
                      : "Ajouter un utilisateur"}
                  </strong>
                </DialogTitle>
                <Divider light />

                <DialogContent>
                  <Box height={14} />
                  <Box sx={{ flexGrow: 1 }}>
                    <Grid container spacing={2}>
                      <Grid item xs={6}>
                        <InputLabel
                          htmlFor="input-with-icon-adornment"
                          style={{ color: "#00008C" }}
                        >
                          Nom
                        </InputLabel>
                        <Field
                          name="firstName"
                          type="name"
                          as={TextField}
                          placeholder=" input"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          error={
                            Boolean(errors.firstName) &&
                            Boolean(touched.firstName)
                          }
                          helperText={
                            Boolean(touched.firstName) && errors.firstName
                          }
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <InputLabel
                          htmlFor="input-with-icon-adornment"
                          style={{ color: "#00008C" }}
                        >
                          Prenom
                        </InputLabel>
                        <Field
                          name="lastName"
                          type="name"
                          as={TextField}
                          placeholder=" input"
                          variant="outlined"
                          color="primary"
                          fullWidth
                          error={
                            Boolean(errors.lastName) &&
                            Boolean(touched.lastName)
                          }
                          helperText={
                            Boolean(touched.lastName) && errors.lastName
                          }
                        />
                      </Grid>
                      <Grid item xs={12}>
                        <InputLabel
                          htmlFor="input-with-icon-adornment"
                          style={{ color: "#00008C" }}
                        >
                          Email
                        </InputLabel>
                        <Field
                          name="email"
                          type="email"
                          as={TextField}
                          variant="outlined"
                          color="primary"
                          placeholder="input.unput@mail.fr"
                          fullWidth
                          error={
                            Boolean(errors.email) && Boolean(touched.email)
                          }
                          helperText={Boolean(touched.email) && errors.email}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </DialogContent>
                <DialogActions>
                  <Grid container justifyContent="flex-end" mr={2}>
                    <Grid item xs={2} sm={2} sx={{ mr: -2 }}>
                      <Button
                        disabled={isloading}
                        color="inherit"
                        variant="text"
                        style={{
                          textTransform: "capitalize",
                          color: "#0000FF",
                        }}
                        onClick={() => handleModalClose()}
                      >
                        Annuler
                      </Button>{" "}
                    </Grid>
                    {/* <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    style={{ textTransform: "capitalize", borderRadius: 50 }}
                    disabled={!isValid || !dirty}
                  >
                    {data.id ? "Modifier" : "Ajouter"}
                  </Button> */}
                    <Grid item xs={2} sm={2}>
                      <LoadingButton
                        loading={isloading}
                        variant="contained"
                        data-testid="login-submit"
                        id="idLoginButton"
                        color="primary"
                        style={{
                          textTransform: "capitalize",
                          borderRadius: 50,
                        }}
                        disabled={!isValid || !dirty}
                        fullWidth
                        type="submit"
                      >
                        {data.id ? "Modifier" : "Ajouter"}
                      </LoadingButton>
                    </Grid>
                  </Grid>
                </DialogActions>
              </Form>
            </Dialog>
          );
        }}
      </Formik>

      <Notification notify={notify} setNotify={setNotify}></Notification>
    </>
  );
}

export { AddEdit };
