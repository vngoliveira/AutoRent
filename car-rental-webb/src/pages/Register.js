import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormField from "../components/FormField";
import "../styles/AuthPages.css";
import { useUser } from "../UserContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpf, setCpf] = useState("");
  const [cep, setCep] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");
  const navigate = useNavigate();
  const { setUserId } = useUser();

  const handleRegister = async (e) => {
    e.preventDefault();
    console.log("Registro:", { name, email, password, dateOfBirth, cpf, cep });

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password, dateOfBirth, cpf, cep }),
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        localStorage.setItem("user", JSON.stringify(data.user));
        setUserId(data.id);
        navigate("/dashboard");
      } else {
        alert("Erro no cadastro: " + data.message);
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
      alert("Erro ao conectar-se ao servidor.");
    }
  };

  return (
    <div className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h2>Cadastro</h2>
        <FormField
          label="Nome"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormField
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormField
          label="Senha"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <FormField
          label="CPF"
          type="text"
          value={cpf}
          onChange={(e) => setCpf(e.target.value)}
        />
        <FormField
          label="CEP"
          type="text"
          value={cep}
          onChange={(e) => setCep(e.target.value)}
        />
        <FormField
          label="Data de Nascimento"
          type="date"
          value={dateOfBirth}
          onChange={(e) => setDateOfBirth(e.target.value)}
        />
        <button type="submit">Registrar</button>
        <p>
          Já tem uma conta? <Link to="/login">Entre</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
