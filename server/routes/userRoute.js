import express from "express";
import requestController from "./../controllers/userRequestController";

const router = express.Router();

router.get("/requests",requestController.getAllRequest);

router.get("/requests/:id",requestController.getARequest);

router.post("/requests",requestController.postARequest);

router.put("/requests/:id",requestController.modifyRequest);

export default router;