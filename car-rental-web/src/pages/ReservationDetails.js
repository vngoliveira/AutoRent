import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../styles/ReservationDetails.css";

const ReservationDetails = () => {
  const { reservationId } = useParams();
  const [reservation, setReservation] = useState(null);
  const [car, setCar] = useState(null);

  useEffect(() => {
    const fetchReservationDetails = async () => {
      try {
        const reservationResponse = await fetch(
          `http://localhost:3000/api/reservations/${reservationId}`
        );
        const reservationData = await reservationResponse.json();

        console.log(reservationData);

        const carResponse = await fetch(
          `http://localhost:3000/api/cars/${reservationData.id}`
        );
        const carData = await carResponse.json();

        setReservation(reservationData);
        setCar(carData);
      } catch (error) {
        console.error("Error fetching reservation details:", error);
      }
    };

    fetchReservationDetails();
  }, [reservationId]);

  if (!reservation || !car) {
    return <p>Loading...</p>;
  }

  return (
    <div className="reservation-details-container">
      <h2>Reservation Details</h2>
      <div className="reservation-details">
        <p>
          <strong>Car Model:</strong> {car.model}
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
        <p>
          <strong>Status:</strong> {reservation.status}
        </p>

        <div className="reservation-actions">
          <Link to="/reservations" className="back-to-reservations-btn">
            Back to Reservations
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ReservationDetails;
