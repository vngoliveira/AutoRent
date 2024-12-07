import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Reservations.css";
import { useUser } from "../UserContext";

const Reservations = () => {
  const [reservations, setReservations] = useState([]);
  const { userId } = useUser();

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const response = await fetch(
          `http://localhost:3000/api/users/${userId}/reservations`
        );
        const data = await response.json();

        const reservationsWithCars = await Promise.all(
          data.map(async (reservation) => {
            const carResponse = await fetch(
              `http://localhost:3000/api/cars/${reservation.carId}`
            );
            const carData = await carResponse.json();

            return {
              ...reservation,
              car: carData,
            };
          })
        );

        setReservations(reservationsWithCars);
      } catch (error) {
        console.error("Error fetching reservations:", error);
      }
    };

    fetchReservations();
  }, [userId]);

  const handleCancel = async (reservationId) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/reservations/${reservationId}/cancel`,
        {
          method: "PUT",
        }
      );
      const data = await response.json();

      console.log(data);

      if (response.ok) {
        alert("Reservation cancelled successfully!");
        setReservations(
          reservations.map((reservation) =>
            reservation.id === reservationId
              ? { ...reservation, status: "cancelled" }
              : reservation
          )
        );
      } else {
        alert("Failed to cancel reservation: " + data.message);
      }
    } catch (error) {
      console.error("Error cancelling reservation:", error);
    }
  };

  console.log(reservations);

  return (
    <div className="reservations-container">
      <h2>Your Reservations</h2>
      <div className="reservations-list">
        {reservations.length === 0 ? (
          <p>You have no active reservations.</p>
        ) : (
          reservations.map((reservation) => (
            <div key={reservation.id} className="reservation-item">
              <p>
                <strong>Car Model:</strong> {reservation.car.model}
              </p>
              <p>
                <strong>Car Price:</strong> ${reservation.price}
              </p>
              <p>
                <strong>Start Date:</strong>{" "}
                {new Date(reservation.startDate).toLocaleDateString()}
              </p>
              <p>
                <strong>End Date:</strong>{" "}
                {new Date(reservation.endDate).toLocaleDateString()}
              </p>
              <div className="reservation-actions">
                <Link
                  to={`/reservation-details/${reservation.id}`}
                  className="view-details-btn"
                >
                  View Details
                </Link>
                {reservation.status !== "cancelled" && (
                  <button
                    onClick={() => handleCancel(reservation.id)}
                    className="cancel-btn"
                  >
                    Cancel Reservation
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Reservations;
