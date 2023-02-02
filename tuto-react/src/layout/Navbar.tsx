import React from "react";
import { createStyles, makeStyles, Theme } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import logo from "../assets/img/Logo.png";
import { useNavigate } from "react-router-dom";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

import { ListItem, ListItemIcon, ListItemText, MenuItem } from "@mui/material";

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
      maxWidth: 200,
    },
  })
);

const style = {
  flexGrow: 2,
};

export default function Navbar() {
  const nav = useNavigate();
  const classes = useStyles();

  function logOut() {
    localStorage.clear();
    nav("/login");
  }

  function onClickHandler() {
    nav("/home");
  }

  return (
    <>
      <div className={classes.root}>
        <AppBar position="static" style={{ justifyContent: "space-between" }}>
          <Toolbar style={{ backgroundColor: "#FFFFFF" }}>
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={onClickHandler}
              style={{ borderRadius: 0 }}
            >
              <img src={logo} className={classes.logo} />
            </IconButton>
            <Typography variant="h6" style={style}></Typography>

            <Typography variant="h6" className={classes.logo}>
              <MenuItem>
                <ListItem>
                  <ListItemIcon>
                    <ExitToAppIcon />
                  </ListItemIcon>
                  <ListItemText style={{ color: "#00008C" }} onClick={logOut}>
                    Déconnexion
                  </ListItemText>
                </ListItem>
              </MenuItem>
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    </>
  );
}
