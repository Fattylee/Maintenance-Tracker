import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';

const router = express.Router();

router.get("/requests",requestController.getAllRequest);

router.get("/requests/:id", requestValidator.getARequest, requestController.getARequest);

router.post("/requests", requestValidator.postARequest, requestController.postARequest);

router.put("/requests/:id", requestValidator.modifyRequest, requestController.modifyRequest);

router.post("/auth/signup", userValidator.signupInput, auth.signupUser);

export default router;