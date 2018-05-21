import express from "express";
import bodyParser from "body-parser";
import router from "./server/routes/userRoute";

const app = express();

const port = process.env.PORT || 3000;
app.listen(3000,()=>{
console.log("server listening for request on port", port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/users",router);
