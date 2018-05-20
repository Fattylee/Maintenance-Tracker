const express = require("express");

const requestController = require("./../controllers/userRequestController");

const router = express.Router();

router.get("/requests",requestController.get);

router.get("/requests/:id",requestController.getRequestId);

router.post("/requests",)

module.exports = router;