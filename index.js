//this is the express app that is built under LinkedIn express course
import express, { response } from "express";
import data from "./data/mock.json" assert {type: 'json'} ;
//assertion type needs to be given lest nodemon crashes

//creating a variable that stores our express app 
const app= express()
//seting a default port for our app
const PORT= 5501

//in order to serve static files, we use an inbuilt express
//function express.static that we pass to app.use
//Therefore, to use files in our public folder we do
//first argument is the route and the second is the folder where we're going to pull these images
app.use("/images", express.static('./public/images'))



/*
app.httpmethod('/route' (request, response)=>{
    response.send() to send a message to our route
})
*/   

//GET  
app.get('/', (req,rep)=>{
   // rep.send("This is a get request")
   rep.json(data) //send the data to cliet in json format
})
//POST
app.post('/create', (req,rep)=>{
    rep.send("This is a post request at /create ")
})
//PUT
app.put('/edit', (req,rep)=>{
    rep.send("This is a put request at /edit ")
})
//DELETE
app.delete('/delete', (req,rep)=>{
    rep.send("This is a delete request at /delete")
})

//specifying the port thru which our app will be deployed onto and will listen to 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`);
    console.table(data)//this data is only logged out in the terminal and not in the console log browser because Express is purposed to abstract info from the client
} )  

//get to retreive data from the server
//post to send data to the serve and create a new resource (i.e add an item to cart )
//put updates the resources
//delete deletes an existing resource

