/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState, useEffect } from "react";
import user from "../models/user";
import userService from "../service/UserService";

import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

import ConfirmDialog from "../components/confirmModal";
import { IconButton, Toolbar, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import FormUser from "../components/formUser";
import Notification from "../components/notification";

function home() {
  const [usersData, setUsersData] = useState<user[]>([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [notify, setNotify] = useState({
    isOpenNotify: false,
    message: "",
    type: "",
  });
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: "Confirmer la suppression",
    subTitle: "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
  });
  const initialValue = { firstName: "", lastName: "", email: "", id: "" };

  const [openForm, setOpenForm] = React.useState(false);
  const [formData, setFormData] = useState(initialValue);

  const [deleteData, setDeleteData] = useState();

  useEffect(() => {
    fetchDataUsers();
  }, []);

  async function fetchDataUsers() {
    await userService.findAllUsers().then((response) => {
      setUsersData(response.data);
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

  function onDeleteUser() {
    let data = userService.deleteUser(deleteData).then((response) => {
      let messageNotif = "La suppression de l’utilisateur a échoué";
      let typeNotif = "error";

      if (response.status == 200) {
        messageNotif = "L’utilisateur a été supprimé avec succès ";
        typeNotif = "success";
        fetchDataUsers();
      }
      setConfirmDialog({
        isOpen: false,
        title: "Confirmer la suppression",
        subTitle: "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
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
      subTitle: "Vous êtes sur le point de supprimer un utilisateur. Cette action est irrévercible. Souhaitez-vous confirmer ?",
    });
    setDeleteData(id);
  }

  const handleClose = () => {
    setOpenForm(false);
    setFormData(initialValue);
  };

  const handleUpdate = (oldData: any) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const onChange = (e: { target: { value: any; id: any } }) => {
    const { value, id } = e.target;

    setFormData({ ...formData, [id]: value });
  };

  const handleFormSubmit = () => {
    if (formData.id == "") {
      const { id, ...newformData } = formData;
      userService.creatUsers(newformData).then((response) => {
        let messageNotif = "L’utilisateur a été ajouté avec succès ",
          typeNotif = "success";
        if (response.status != 201) {
          messageNotif = "La suppression de l’utilisateur a échoué";
          typeNotif = "error";
        }
        setNotify({
          isOpenNotify: true,
          message: messageNotif,
          type: typeNotif,
        });
        setOpenForm(false);
      });
    } else {
      userService.updateUsers(formData).then((response) => {
        let messageNotif = "La modification de l’utilisateur a échoué ";
        let typeNotif = "error";
        if (response.status == 200 || response.status == 201) {
          messageNotif = "L’utilisateur a été modifié avec succè";
          typeNotif = "success";
          fetchDataUsers();
        }
        setNotify({
          isOpenNotify: true,
          message: messageNotif,
          type: typeNotif,
        });
        setOpenForm(false);
        setNotify({
          isOpenNotify: true,
          message: messageNotif,
          type: typeNotif,
        });
      });
    }
  };

  return (
    <div>
      <Toolbar>
        <Button variant="contained" onClick={handleClickOpen} style={{borderRadius:30}}>
          Ajouter un utilisateur
        </Button>
      </Toolbar>
      <Paper sx={{ width: 1280, overflow: "hidden" }}>
        <TableContainer sx={{ maxHeight: 800 }}>
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
                        </TableCell>{" "}
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

      <Notification notify={notify} setNotify={setNotify}></Notification>

      <FormUser
        open={openForm}
        handleClose={handleClose}
        data={formData}
        onChange={onChange}
        handleFormSubmit={handleFormSubmit}
      ></FormUser>
    </div>
  );
}
export default home;
