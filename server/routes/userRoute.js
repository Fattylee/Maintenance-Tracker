import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';
import verify from './../middlewares/verification';
// import jwt from 'jsonwebtoken';

const router = express.Router();


// router.get("/users/requests",requestController.getAllRequest);

// router.get("/users/requests/:id", requestValidator.getARequest, requestController.getARequest);

// router.post("/users/requests", requestValidator.postARequest, requestController.postARequest);

// router.put("/users/requests/:id", requestValidator.modifyRequest, requestController.modifyRequest);

router.post("/auth/signup", userValidator.signupInput, auth.signupUser);

//userValidator.signupInput,
router.post("/auth/signin", auth.signinUser);

//test protected route,
router.post("/users/requests", verify, requestController.testPost);

router.get("/", requestController.home);

router.all("*", requestController.all);

export default router;