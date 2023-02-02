import React from "react";
import "./App.css";

import Home from "./pages/home";
import LoginPages from "./pages/login";
import { Route, Routes } from "react-router-dom";
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
