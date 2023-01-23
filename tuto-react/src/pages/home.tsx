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
import { IconButton, Toolbar, Tooltip } from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

import Button from "@mui/material/Button";
import Notification from "../components/notification";
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
  const initialValueData = { firstName: "", lastName: "", email: "", id: "" };

  const [openForm, setOpenForm] = React.useState(false);
  const [formData, setFormData] = useState(initialValueData);

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
    setFormData(initialValueData);
  };

  const handleUpdate = (oldData: any) => {
    setFormData(oldData);
    handleClickOpen();
  };

  const handleClickOpen = () => {
    setOpenForm(true);
  };

  const onChange = (e: { target: { value: any; name: any } }) => {
    const { value, name } = e.target;

    setFormData({ ...formData, [name]: value });
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
            onClick={handleClickOpen}
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
        <Paper sx={{ width: 1280, top: "60px", overflow: "hidden" }}>
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
          onChange={onChange}
          data={formData}
          setInitialValue={setInitialValue}
          handleFormSubmit={handleFormSubmit}
        ></AddEdit>
      </div>
    </>
  );
}
export default home;
