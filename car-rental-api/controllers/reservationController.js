const { Reservation, Car } = require("../models");

exports.createReservation = async (req, res) => {
  try {
    const { userId, carId, startDate, endDate, price, status } = req.body;

    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    if (!car.availability) {
      return res.status(400).json({ error: "Car is not available" });
    }

    const reservation = await Reservation.create({
      userId,
      carId,
      startDate,
      endDate,
      price,
      status,
    });

    await car.update({ availability: false });

    res.status(201).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.cancelReservation = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId);
    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    await reservation.update({ status: "cancelled" });
    const car = await Car.findByPk(reservation.carId);
    await car.update({ availability: true });

    res.status(200).json({ message: "Reservation cancelled successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getReservationDetails = async (req, res) => {
  try {
    const { reservationId } = req.params;

    const reservation = await Reservation.findByPk(reservationId);

    if (!reservation) {
      return res.status(404).json({ error: "Reservation not found" });
    }

    res.status(200).json(reservation);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getAllReservations = async (req, res) => {
  try {
   
    const reservations = await Reservation.findAll({
      order: [["createdAt", "DESC"]],
    });

    if (!reservations || reservations.length === 0) {
      return res.status(404).json({ error: "No reservations found" });
    }

    res.status(200).json(reservations);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
