const { Car } = require("../models");

exports.listCars = async (req, res) => {
  try {
    const cars = await Car.findAll();
    res.status(200).json(cars);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createCar = async (req, res) => {
  try {
    const { model, category, dailyRate, availability } = req.body;

    const car = await Car.create({ model, category, dailyRate, availability });

    res.status(201).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getCarById = async (req, res) => {
  try {
    const carId = req.params.id;
    const car = await Car.findByPk(carId);
    if (!car) {
      return res.status(404).json({ error: "Car not found" });
    }

    res.status(200).json(car);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
