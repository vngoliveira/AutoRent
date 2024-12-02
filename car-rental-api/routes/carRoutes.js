const express = require("express");
const carController = require("../controllers/carController");
const router = express.Router();

router.get("/", carController.listCars);
router.post("/", carController.createCar);
router.get("/:id", carController.getCarById);

module.exports = router;
