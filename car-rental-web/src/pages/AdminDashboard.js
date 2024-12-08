import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const AdminDashboard = () => {
  const [cars, setCars] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      const response = await fetch("http://localhost:3000/api/cars");
      const data = await response.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  const handleDeleteCar = async (carId) => {
    try {
      const response = await fetch(`http://localhost:3000/api/cars/${carId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCars(cars.filter((car) => car.id !== carId));
        alert("Carro excluído com sucesso!");
      } else {
        alert("Erro ao excluir o carro.");
      }
    } catch (error) {
      console.error("Error deleting car:", error);
    }
  };

  const handleEditCar = (carId) => {
    navigate(`/edit-car/${carId}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Gerenciar Carros</h1>
      <div className="car-list">
        {cars.length === 0 ? (
          <p>Nenhum carro cadastrado no momento.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <h2>{car.model}</h2>
              <p>Categoria: {car.category}</p>
              <p>
                Preço por dia: R${" "}
                {car.dailyRate !== undefined ? car.dailyRate : "Indisponível"}
              </p>
              <p>
                Disponibilidade:{" "}
                {car.availability ? "Disponível" : "Indisponível"}
              </p>
              <div className="actions">
                <button
                  className="btn-edit"
                  onClick={() => handleEditCar(car.id)}
                >
                  Editar
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDeleteCar(car.id)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
