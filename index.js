import express from "express";
import data from "./data/mock.json" assert {type: 'json'}

//creating a variable that stores our express app 
const app= express()
//seting a default port for our app
const PORT= 5500

//specifying the port that our app will be deployed onto and will listen to 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}`);
    console.log(data)//this data is only logged out in the terminal and not in the console log browser. Express is purposed to abstract info from the client
} ) 