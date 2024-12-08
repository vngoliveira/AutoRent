import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/EditCar.css";

const EditCar = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [car, setCar] = useState({ model: "", category: "", dailyRate: "", availability: true });

  useEffect(() => {
    const fetchCar = async () => {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`);
      const data = await response.json();
      setCar(data);
    };

    fetchCar();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(`http://localhost:3000/api/cars/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(car),
      });

      if (response.ok) {
        alert("Carro atualizado com sucesso!");
        navigate("/admin-dashboard");
      } else {
        alert("Erro ao atualizar o carro.");
      }
    } catch (error) {
      console.error("Error updating car:", error);
    }
  };

  return (
    <div className="edit-car-container">
      <h1>Editar Carro</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Modelo:
          <input
            type="text"
            value={car.model}
            onChange={(e) => setCar({ ...car, model: e.target.value })}
          />
        </label>
        <label>
          Categoria:
          <input
            type="text"
            value={car.category}
            onChange={(e) => setCar({ ...car, category: e.target.value })}
          />
        </label>
        <label>
          Preço por dia:
          <input
            type="number"
            value={car.dailyRate}
            onChange={(e) => setCar({ ...car, dailyRate: e.target.value })}
          />
        </label>
        <label>
          Disponível:
          <input
            type="checkbox"
            checked={car.availability}
            onChange={(e) => setCar({ ...car, availability: e.target.checked })}
          />
        </label>
        <button type="submit">Salvar</button>
      </form>
    </div>
  );
};

export default EditCar;
