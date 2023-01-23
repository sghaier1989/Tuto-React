import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/img/Logo.png";
import { useNavigate } from "react-router-dom";

import ExitToAppIcon from "@mui/icons-material/ExitToApp";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(8),
    },
    title: {
      flexGrow: 1,
      textAlign: "center",
    },
    logo: {
      maxWidth: 100,
    },
  })
);

export default function Navbar() {
  const nav = useNavigate();
  const classes = useStyles();

  function logOut() {
    localStorage.clear();
    nav("/login");
  }

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{ justifyContent: "space-between" }}>
        <Toolbar style={{ backgroundColor: "#FFFFFF" }}>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            style={{ borderRadius: 0 }}
          >
            <img src={logo} className={classes.logo} />
          </IconButton>

          <Typography variant="h6" className={classes.logo}>
            <Button
              variant="contained"
              color="inherit"
              startIcon={<ExitToAppIcon />}
              onClick={logOut}
            >
              Déconnexion
            </Button>
          </Typography>
        </Toolbar>
      </AppBar>
    </div>
  );
}
