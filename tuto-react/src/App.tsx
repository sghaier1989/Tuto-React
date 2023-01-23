import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Home from "./pages/home";
import LoginPages from "./pages/login";
import { AddEdit } from "./components/addEdit";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { Login } from "@mui/icons-material";
import { PrivateRoute } from "./service/privateroute";

function App() {
  return (
    <div className="App">
      <React.Fragment>
        <Routes>
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/login" element={<LoginPages />} />
          <Route
            path="*"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
        </Routes>

        {/* <FormUser/> */}
      </React.Fragment>
    </div>
  );
}

export default App;
