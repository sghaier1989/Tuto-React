/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import user from "../models/user";
import userService from "../service/UserService";
import AddIcon from "@mui/icons-material/Add";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import ConfirmDialog from "../components/confirmModal";
import { CircularProgress, IconButton, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import { AddEdit } from "../components/addEdit";
import Navbar from "../layout/Navbar";

function home() {
  const [usersData, setUsersData] = useState<user[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const [notify, setNotify] = useState({
    isOpenNotify: false,
    message: "",
    type: "",
  });
  const [initialValueForm, setInitialValue] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "Confirmer la suppression",
    subTitle:
      "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
  });
  const initialValueData = { firstName: "", lastName: "", email: "" };

  const [openForm, setOpenForm] = React.useState(false);
  const [formData, setFormData] = useState(initialValueData);

  const [deleteData, setDeleteData] = useState();
  const [loadData, setLoadData] = useState(false);

  useEffect(() => {
    fetchDataUsers();
  }, []);

  async function fetchDataUsers() {
    setLoadData(true);
    await userService.findAllUsers().then((response) => {
      setUsersData(response.data);
      setLoadData(false);
    });
  }

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  function onDeleteUser() {
    userService.deleteUser(deleteData).then((response) => {
      let messageNotif = "La suppression de l’utilisateur a échoué";
      let typeNotif = "error";

      if (response.status === 200) {
        messageNotif = "L’utilisateur a été supprimé avec succès ";
        typeNotif = "success";
        fetchDataUsers();
        setFormData(initialValueData);
      }
      setConfirmDialog({
        isOpen: false,
        title: "Confirmer la suppression",
        subTitle:
          "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
      });
      setNotify({
        isOpenNotify: true,
        message: messageNotif,
        type: typeNotif,
      });
    });
  }

  function onDelete(id: any) {
    setConfirmDialog({
      isOpen: true,
      title: "Confirmer la suppression",
      subTitle:
        "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
    });
    setDeleteData(id);
  }

  const handleClose = () => {
    setOpenForm(false);
    sleep().then(() => {
      setFormData(initialValueForm);
    });
  };

  function sleep() {
    return new Promise((resolve) => setTimeout(resolve, 100));
  }

  const handleUpdate = (oldData: any) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const handleClickOpenAdd = () => {
    setFormData(initialValueData);
    setOpenForm(true);
  };

  const handleFormSubmit = () => {
    fetchDataUsers();
  };

  return (
    <>
      <Navbar />

      <div
        style={{
          justifyContent: "center",
          display: "inline-grid",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "right",
            marginTop: "60px",
          }}
        >
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={handleClickOpenAdd}
            style={{
              borderRadius: 30,
              display: "flex",
              marginBottom: "10px",
              alignItems: "space-between",
              textTransform: "none",
            }}
          >
            Ajouter un utilisateur
          </Button>
        </div>
        <Paper sx={{ width: 1080, top: "60px", overflow: "hidden" }}>
          <TableContainer sx={{ maxHeight: 800 }}>
            {loadData ? <CircularProgress /> : null}
            <Table stickyHeader aria-label="sticky table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <strong>Nom</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Prenom</strong>
                  </TableCell>
                  <TableCell>
                    <strong>Email</strong>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {usersData &&
                  usersData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => {
                      return (
                        <TableRow
                          hover
                          role="checkbox"
                          tabIndex={-1}
                          key={user.id}
                        >
                          <TableCell>{user.firstName}</TableCell>
                          <TableCell>{user.lastName} </TableCell>
                          <TableCell> {user.email}</TableCell>
                          <TableCell>
                            <Tooltip
                              title="modifier"
                              onClick={() => handleUpdate(user)}
                            >
                              <IconButton>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip
                              title="Delete"
                              onClick={() => {
                                onDelete(user.id);
                              }}
                            >
                              <IconButton>
                                <DeleteIcon />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      );
                    })}
              </TableBody>
            </Table>
          </TableContainer>
          <TablePagination
            rowsPerPageOptions={[10, 25, 100]}
            component="div"
            count={usersData.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Paper>

        <ConfirmDialog
          confirmDialog={confirmDialog}
          setConfirmDialog={setConfirmDialog}
          deleteFunction={onDeleteUser}
        />

        <AddEdit
          open={openForm}
          handleClose={handleClose}
          data={formData}
          onChange={onChange}
          setInitialValue={setInitialValue}
          handleFormSubmit={handleFormSubmit}
        ></AddEdit>
      </div>
    </>
  );
}
export default home;
