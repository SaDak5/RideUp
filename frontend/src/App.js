import React from "react";
import "./App.css";
import Home from "./components/home";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/login";
import RegisterConducteur from "./components/registerConducteur";
import RegisterPassager from "./components/registerPassager";
import Trajet from "./components/user/passager/trajet";
import Reservation from "./components/user/passager/reservation";
import HomeConducteur from "./components/user/conducteur/home";
import ReservationConducteur from "./components/user/conducteur/reservation";
import Dashboard from "./components/dashboard";
import Profil from "./components/profil";
import ModifierProfil from "./components/modifierProfil";
import ListeUtilisateurs from "./components/listeUtilisateurs";
import DashboardAdmin from "./components/user/admin/dashbadmin";
import ControlerTrajet from "./components/user/admin/controle";
import Page404 from "./components/404";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Home />} />
        <Route path="/registerConducteur" element={<RegisterConducteur />} />
        <Route path="/registerPassager" element={<RegisterPassager />} />
        <Route path="/passager/trajet" element={<Trajet />} />
        <Route path="/passager/reservation" element={<Reservation />} />
        <Route path="/conducteur/home" element={<HomeConducteur />} />
        <Route
          path="/conducteur/reservation"
          element={<ReservationConducteur />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profil" element={<Profil />} />
        <Route path="/modifierProfil" element={<ModifierProfil />} />
        <Route path="/listeUtilisateurs" element={<ListeUtilisateurs />} />
        <Route path="/dashboarda" element={<DashboardAdmin />} />
        <Route path="/controleTrajet" element={<ControlerTrajet />} />
        <Route path="/404" element={<Page404 />} />
      </Routes>
    </Router>
  );
}

export default App;
