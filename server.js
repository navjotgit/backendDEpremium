
const express = require("express");
const fs = require("fs");
const app = express();


app.use((req,res,next)=>{
  const requestDetails = {
    timestamp : new Date().toISOString(),
    ipAddress : req.ip,
    url : req.originalUrl,
    protocol : req.protocol.toUpperCase(),
    method : req.method,
    hostname : req.hostname
  };

  const logString = JSON.stringify(requestDetails) + '/n';

  fs.appendFile('requests.log',logString,(err)=>{
    if(err){
      console.error("Error writing to file : ",err);
    }else{
      console.log("Request logged Succesfully");
    }
  })

  const logEntry = ` 1. Time stamp = ${requestDetails.timestamp}, 
  2. IP address = ${requestDetails.ipAddress}
  3. URL = ${requestDetails.url} , 
  4. protocol = ${requestDetails.protocol} , 
  5. HTTP method = ${requestDetails.method}, 
  6. Hostname = ${requestDetails.hostname}`;

   console.log(logEntry);

   next();
});

app.get("/",(req,res)=>{
  res.send("good morning pineapple looking very good very nice");
})

app.listen(303,()=>{
  console.log(" ok i am listining on port number 300 haha haha !");
})