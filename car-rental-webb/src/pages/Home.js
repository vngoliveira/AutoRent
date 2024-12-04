import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>Bem-vindo ao Sistema de Aluguel de Carros</h1>
        <p>Escolha uma opção para começar:</p>
        <div className="home-buttons">
          <Link to="/login" className="home-button">
            Login
          </Link>
          <Link to="/register" className="home-button">
            Registrar
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
