const express = require("express");
const userController = require("../controllers/userController");
const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/:id", userController.getUser);
router.put("/:id", userController.updateUser);
router.get("/:id/reservations", userController.getUserReservations);

module.exports = router;
