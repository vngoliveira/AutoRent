import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "../styles/Reservation.css";
import { useUser } from "../UserContext";

const Reservation = () => {
  const { carId } = useParams();
  const [car, setCar] = useState(null);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();
  const { userId } = useUser();

  useEffect(() => {
    const fetchCar = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/cars/${carId}`);
        const data = await response.json();
        setCar(data);
      } catch (error) {
        console.error("Erro ao buscar detalhes do carro:", error);
      }
    };

    fetchCar();
  }, [carId]);

  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const days = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
      setTotalPrice(days > 0 ? days * car.dailyRate : 0);
    }
  }, [startDate, endDate, car]);

  const handleReservation = async (status) => {
    try {
      const response = await fetch("http://localhost:3000/api/reservations", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userId: userId,
          carId,
          startDate,
          endDate,
          price: totalPrice,
          status,
        }),
      });

      if (response.ok) {
        setMessage(
          `Reserva ${
            status === "awaiting payment" ? "confirmada" : "salva"
          } com sucesso!`
        );
        setTimeout(() => navigate("/dashboard"), 2000);
      } else {
        const errorData = await response.json();
        setMessage(
          `Erro ao criar reserva: ${errorData.message || "Desconhecido"}`
        );
      }
    } catch (error) {
      console.error("Erro ao criar reserva:", error);
      setMessage("Erro ao criar reserva.");
    }
  };

  if (!car) {
    return <p>Carregando detalhes do carro...</p>;
  }

  return (
    <div className="reservation-container">
      <h1>Confirmar Reserva</h1>
      <div className="car-details">
        <h2>{car.model}</h2>
        <p>Categoria: {car.category}</p>
        <p>Preço por dia: R$ {car.dailyRate}</p>
        <p>Status: {car.availability ? "Disponível" : "Indisponível"}</p>
      </div>
      <form>
        <label>
          Data de Início:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            required
          />
        </label>
        <label>
          Data de Término:
          <input
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            required
          />
        </label>
      </form>
      <p>
        <strong>Preço Total:</strong> R$ {totalPrice.toFixed(2)}
      </p>
      <div class="button-container">
        <button
          onClick={() => handleReservation("pending")}
          disabled={!startDate || !endDate || totalPrice <= 0}
        >
          Salvar Reserva
        </button>
        <button
          onClick={() => handleReservation("awaiting payment")}
          disabled={!startDate || !endDate || totalPrice <= 0}
        >
          Confirmar Reserva
        </button>
      </div>
      {message && <p className="feedback-message">{message}</p>}
    </div>
  );
};

export default Reservation;
