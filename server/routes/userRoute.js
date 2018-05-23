import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';

const router = express.Router();

router.get("/requests",requestController.getAllRequest);

router.get("/requests/:id",requestController.getARequest);

router.post("/requests", requestValidator.postARequest, requestController.postARequest);

router.put("/requests/:id",requestController.modifyRequest);

router.use("/auth/signup",userValidator.signupInput);

router.post("/auth/signup", auth.signupUser);

export default router;