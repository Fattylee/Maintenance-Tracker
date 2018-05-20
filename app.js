const express = require("express");
const bodyParser = require("body-parser");
const router = require("./server/routes/userRoute");
//import router from "./server/routes/userRoute";

const app = express();

const port = process.env.PORT || 3000;
app.listen(3000,()=>{
  console.log("server listening for request on port", port);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));
app.use("/user",router);

class Car{
  constructor(color){
    this.color = color;
  }
  print(){
    console.log(`the color of my is ${this.color}`);
  }
}

new Car("brown").print();
new Car("red").print();