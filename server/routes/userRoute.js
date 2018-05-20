const express = require("express");

const requestController = require("./../controllers/userRequestController");

const router = express.Router();

router.get("/requests",requestController.getAllRequest);



module.exports = router;