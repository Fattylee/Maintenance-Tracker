import express from "express";
import path from 'path'

// import jwt from 'jsonwebtoken';

const router = express.Router();





///requests/<requestId>/resolve
router.get("/",(req, res)=>{
  res.sendFile(path.join(__dirname, '/../../ui/index.html'));
} );

router.get("/requests",(req, res)=>{
  res.sendFile(path.join(__dirname, '/../../ui/request-list.html'));
} );

router.get("/makeRequest",(req, res)=>{
  res.sendFile(path.join(__dirname, '/../../ui/request.html'));
} );



export default router;