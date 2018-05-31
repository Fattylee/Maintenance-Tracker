import express from "express";
import requestController from "./../controllers/userRequestController";
import auth from './../controllers/userAuthController';
import userValidator from './../middlewares/userValidator';
import requestValidator from './../middlewares/userRequestValidator';
import verifyToken from './../middlewares/verification';
// import jwt from 'jsonwebtoken';

const router = express.Router();


router.post("/auth/signup", userValidator.signupInput, auth.signupUser);

//userValidator.signupInput,
router.post("/auth/signin", auth.signinUser);

//protected route
router.get("/users/requests", verifyToken, requestController.getAllRequest);

//, requestValidator.getARequest //protected route
router.get("/users/requests/:id", verifyToken, requestController.getARequest);

//protected route
router.post("/users/requests", requestValidator.postARequest, verifyToken, requestController.postARequest);

//protected route  , requestValidator.modifyRequest
router.put("/users/requests/:id",requestValidator.modifyRequest, verifyToken, requestController.modifyRequest);

//admin fetch all users 
router.get("/requests", verifyToken, requestController.getAllRequestAdmin);

///requests/<requestId>/approve
router.put("/requests/:requestId/approve", verifyToken, requestController.adminApprove);

///requests/<requestId>/disapprove
router.put("/requests/:requestId/disapprove", verifyToken, requestController.adminDisapprove);

///requests/<requestId>/resolve
router.put("/requests/:requestId/resolve", verifyToken, requestController.adminResolve);

router.get("/", requestController.home);

router.all("*", requestController.all);

export default router;