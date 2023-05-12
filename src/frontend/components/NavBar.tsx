import { Link } from "react-router-dom";
import { atletas_path, historial_path, planificacion_path } from "./Main";
import React from "react";
import '../css/NavBar.css';

export const NavBar = () => (
    <div className="side-nav-bar">
      <div className="app-name">CogitasCurrentem</div>
      <Link to="/" className="nav-link">Home</Link>
      <Link to={atletas_path} className="nav-link">Atletas</Link>
      <Link to={planificacion_path} className="nav-link">Planificacion</Link>
      <Link to={historial_path} className="nav-link">Historial</Link>
    </div>
  );

