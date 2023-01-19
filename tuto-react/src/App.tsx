import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

import Home from "./components/home";

function App() {
  return (
    <div className="App">
    <React.StrictMode>

      <Home />
      {/* <FormUser/> */}
      </React.StrictMode>

    </div>
  );
}

export default App;
