const express = require("express");

const requestController = require("./../controllers/userRequestController");

const router = express.Router();

router.get("/requests",requestController.getAllRequest);

router.get("/requests/:id",requestController.getARequest);

module.exports = router;