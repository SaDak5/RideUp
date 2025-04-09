import React from "react";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import RegisterConducteur from "./components/registerConducteur";
import RegisterPassager from "./components/registerPassager";
import Trajet from "./components/user/passager/trajet";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/registerConducteur" element={<RegisterConducteur />} />
        <Route path="/registerPassager" element={<RegisterPassager />} />
        <Route path="/passager/trajet" element={<Trajet />} />
      </Routes>
    </Router>
  );
}

export default App;
