import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Paper,
  FormControlLabel,
  Checkbox,
  InputLabel,
  InputAdornment,
  IconButton,
} from "@material-ui/core";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Stack } from "@mui/system";
import { Form } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const LoginPages = () => {
  const nav = useNavigate();

  const [showPass, setShowPass] = useState(false);
  //const [email, setEmail] = useState({email:"",password:"",isChecked:false});

  const paperStyle = {
    padding: 30,
    height: "50vh",
    width: 410,
    margin: "100px auto",
  };

  const gridStyle = { padding: 16 };
  const btnstyle = {
    height: 44,
    left: 0,
    borderRadius: "24px",
    padding: " 14 24 14 24",
  };

  function loginSubmit() {
    localStorage.setItem("accessToken", "token acess app");
    nav("/home");
  }

  return (
    <form style={paperStyle}>
      <Paper elevation={10} style={paperStyle}>
        <Grid style={gridStyle}>
          <Stack>
            <Typography
              variant="h5"
              component="h2"
              align="left"
              style={{ color: "#666D92" }}
            >
              <b>Accédez à</b>
            </Typography>
            <Typography
              variant="h4"
              component="h2"
              align="left"
              style={{ color: "#0000FF" }}
            >
              <b>Tuto-React</b>
            </Typography>
          </Stack>
        </Grid>
        <Grid container style={gridStyle}>
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{ color: "#00008C" }}
          >
            Email
          </InputLabel>
          <TextField
            placeholder="Enter username"
            color="primary"
            variant="outlined"
            fullWidth
            required
          />
        </Grid>
        <Grid container style={gridStyle}>
          <InputLabel
            htmlFor="input-with-icon-adornment"
            style={{ color: "#00008C" }}
          >
            Passsword
          </InputLabel>
          <TextField
            placeholder="Enter password"
            type={showPass ? "text" : "password"}
            variant="outlined"
            color="primary"
            fullWidth
            required
            InputProps={{
              endAdornment: (
                <InputAdornment position="start">
                  <IconButton  onClick={() => setShowPass(!showPass)}>
                    {showPass ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />{" "}
        </Grid>
        <Grid container style={gridStyle}>
          <FormControlLabel
            style={{ color: "#00008C", fontFamily:'Barlow' }}
            labelPlacement="end"
            control={<Checkbox name="checkedB" color="primary" />}
            label="Se souvenir de moi"
          />
        </Grid>
        <Grid >
          <Button
            color="primary"
            variant="contained"
            style={btnstyle}
            fullWidth
            onClick={loginSubmit}
          >
            Connexion
          </Button>
        </Grid>
      </Paper>
    </form>
  );
};

export default LoginPages;
