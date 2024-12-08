import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";
import "../styles/Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <ul>
        {user?.role === "admin" ? (
          <>
            <li>
              <Link to="/cars/new">Cadastrar Carros</Link>
            </li>
            <li>
              <Link to="/admin-dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/admin/reservations">Reservas</Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/reservations">Reservas</Link>
            </li>
            <li>
              <Link to="/edit-profile">Editar Perfil</Link>
            </li>
          </>
        )}
        {localStorage.getItem("user") ? (
          <li id="logout-li">
            <button onClick={handleLogout} id="logout-btn">
              Logout
            </button>
          </li>
        ) : (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Cadastro</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
