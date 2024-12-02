const express = require("express");
const reservationController = require("../controllers/reservationController");
const router = express.Router();

router.post("/", reservationController.createReservation);
router.put("/:reservationId/cancel", reservationController.cancelReservation);
router.get("/:reservationId", reservationController.getReservationDetails);

module.exports = router;
