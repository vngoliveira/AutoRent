import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Dashboard.css";

const Dashboard = () => {
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

  const handleRentCar = (carId) => {
    navigate(`/reservation/${carId}`);
  };

  return (
    <div className="dashboard-container">
      <h1>Carros Disponíveis para Aluguel</h1>
      <div className="car-list">
        {cars.length === 0 ? (
          <p>Nenhum carro disponível no momento.</p>
        ) : (
          cars.map((car) => (
            <div key={car.id} className="car-card">
              <h2>{car.model}</h2>
              <p>Categoria: {car.category}</p>
              <p>
                Preço por dia: R${" "}
                {car.dailyRate !== undefined ? car.dailyRate : "Indisponível"}
              </p>
              <button
                onClick={() => handleRentCar(car.id)}
                disabled={!car.availability}
              >
                {car.availability ? "Alugar" : "Indisponível"}
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Dashboard;
