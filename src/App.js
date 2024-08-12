import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  NavLink,
} from "react-router-dom";
import Dashboard from "./Dashboard";
import Card from "./Card";
import "./App.css";

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

const AppContent = () => {
  const [toggle, setToggle] = useState(
    window.location.pathname === "/dashboard"
  );

  const handleToggle = () => {
    setToggle(!toggle);
  };

  return (
    <div className="App">
      <nav>
        <NavLink
          to={toggle ? "/" : "/dashboard"}
          onClick={handleToggle}
          className={"link"}
        >
          {toggle ? "FlashCards" : "Dashboard"}
        </NavLink>
      </nav>
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/" element={<Card />} />
      </Routes>
    </div>
  );
};

export default App;
