import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';
import verifyToken from './../middlewares/verification';
// import jwt from 'jsonwebtoken';

const router = express.Router();






// router.post("/users/requests", requestValidator.postARequest, requestController.postARequest);

// router.put("/users/requests/:id", requestValidator.modifyRequest, requestController.modifyRequest);

router.post("/auth/signup", userValidator.signupInput, auth.signupUser);

//userValidator.signupInput,
router.post("/auth/signin", auth.signinUser);

//test protected route,
router.post("/users/requests", requestValidator.postARequest, verifyToken, requestController.postARequest);

router.get("/users/requests", verifyToken, requestController.getAllRequest);
//, requestValidator.getARequest
router.get("/users/requests/:id", verifyToken, requestValidator.getARequest);

router.get("/", requestController.home);

router.all("*", requestController.all);

export default router;