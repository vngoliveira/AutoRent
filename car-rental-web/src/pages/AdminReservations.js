import React, { useEffect, useState } from "react";
import "../styles/AdminReservations.css";

const AdminReservations = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/reservations");
        const data = await response.json();

        const enrichedReservations = await Promise.all(
          data.map(async (reservation) => {
            const userResponse = await fetch(
              `http://localhost:3000/api/users/${reservation.userId}`
            );
            const userData = await userResponse.json();

            const carResponse = await fetch(
              `http://localhost:3000/api/cars/${reservation.carId}`
            );
            const carData = await carResponse.json();

            return {
              ...reservation,
              userName: userData.name,
              carModel: carData.model,
            };
          })
        );

        setReservations(enrichedReservations);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, []);

  const cancelReservation = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/${reservationId}/cancel`,
        { method: "PUT" }
      );

      if (response.ok) {
        setReservations((prevReservations) =>
          prevReservations.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, status: "cancelled" }
              : reservation
          )
        );
      } else {
        console.error("Failed to cancel reservation:", response.statusText);
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  if (loading) {
    return <p>Loading reservations...</p>;
  }

  return (
    <div className="admin-reservations">
      <h1>Gerenciar Reservas</h1>
      <table>
        <thead>
          <tr>
            <th>Reserva ID</th>
            <th>Usuário</th>
            <th>Carro</th>
            <th>Início</th>
            <th>Fim</th>
            <th>Preço</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {reservations.map((reservation) => (
            <tr key={reservation.id}>
              <td>{reservation.id}</td>
              <td>{reservation.userName}</td>
              <td>{reservation.carModel}</td>
              <td>{new Date(reservation.startDate).toLocaleDateString()}</td>
              <td>{new Date(reservation.endDate).toLocaleDateString()}</td>
              <td>R$ {reservation.price.toFixed(2)}</td>
              <td className={`status ${reservation.status}`}>
                {reservation.status}
              </td>
              <td>
                {reservation.status !== "cancelled" && (
                  <button
                    onClick={() => cancelReservation(reservation.id)}
                    className="cancel-btn"
                  >
                    Cancelar
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminReservations;
