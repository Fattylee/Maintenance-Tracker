import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';

const router = express.Router();


// router.get("/users/requests",requestController.getAllRequest);

// router.get("/users/requests/:id", requestValidator.getARequest, requestController.getARequest);

// router.post("/users/requests", requestValidator.postARequest, requestController.postARequest);

// router.put("/users/requests/:id", requestValidator.modifyRequest, requestController.modifyRequest);

router.post("/auth/signup", userValidator.signupInput, auth.signupUser);

router.get("/", requestController.home);

router.all("*", requestController.all);

export default router;