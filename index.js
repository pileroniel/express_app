//this is the express app that is built under LinkedIn express course
import express, { response } from "express";
import data from "./data/mock.json" assert {type: 'json'} ;
//assertion type needs to be given lest nodemon crashes

//creating a variable that stores our express app 
const app= express()
//seting a default port for our app
const PORT= 5501


//in order to serve static files, we use an inbuilt express middleware
//function express.static that we pass to app.use. App.use is a builtin 
//function for handling middlewares

//Therefore, to use files in our public folder we do this and can reference anything
//inside it with it's name on the root base. ,i.e localhost:5501/city.jpg

app.use( express.static('public'))

//If we want to make a route instead of using the public way, 
//we still use app.use but the first argument is the route and the second
// is the folder where we're going to pull these images. A complete route however,
//means using the filename explicitly, so that we don't have a GET error
app.use('/images', express.static('images'))

//using express.json and urlencoded
app.use(express.json())

//you must define the extended option to true. THis gives us more of
//of a json experience
app.use(express.urlencoded({extended:true})) 



//GET  
app.get('/', (req,res)=>{
   // res.send("This is a get request")
   res.json(data) //send the data to cliet in json format
})

//GET with next
app.get('/next', (req,res,next)=>{
    console.log('first callback')
    next()
}
,
(req,res)=>{
   
   res.send('this is the second callback for this route')
})

//GET - with parameters

//Creating a route with parameters
//req.params sends back a json object with the key values at the
//point of replacement
//all route parameters are intepreted as strings, so you can modify it



//GET - redirect response method
app.get('/redirect', (req,res)=>{
    throw new Error()
    res.redirect('https:/assistivemath.com')
})

//GET - download response method
app.get('/images', (req,res)=>{
    res.download('./images/city.jpg') 
})

//POST

app.post('/create', (req,res)=>{
    res.send("This is a post request at /create ")
})

//POST with express.json() and urlencoded
//in this example, since we want the body of the request, we can
//use postman to set the body and the headers up before sending the post
//request or else, it will be an empty response

//if you're setting your body to be in json format, then you should 
//remmber to use the express.json middleware else an empty response

// in postman/before you send a post request set the content-type header to application/json or application/x-www-form-urlencoded to work with a request using the middleware express.json or express.urlencoded respectively 
app.post('/item', (req,res)=>{
    console.log(req.body)
    res.send(req.body)
})


//PUT
app.put('/edit', (req,res)=>{
    res.send("This is a put request at /edit ")
})
//DELETE
app.delete('/delete', (req,res)=>{
    
    res.send("This is a delete request at /delete")
})



//get to retreive data from the server
//post to send data to the serve and create a new resource (i.e add an item to cart )
//put updates the resources
//delete deletes an existing resource

//route chaining when we have multiple methods at the same route
//to avoid redundancy, i.e get and post together
app
.route('/class/:id') 
.get((req, res,next) => {
  const sid = Number(req.params.id);

  //if id is 1, skip to the next route, else pass to the next function in the middleware stack


  sid == 1?next('route'): next()
//  res.json(student);
}, 
(req,res,next)=>{
    const sid = Number(req.params.id);
    
    //throwing an error if the id is greater than 50 so as to enable 
    //error handling with a middleware function.
    if(sid>50)
    {
        throw new Error()
    }
    else{
        const student = data.filter((std) => std.id == sid);
        res.json(student);
    }
    
}

)
.post((req,res)=>{
    const std = req
    res.send('this is a post response with details' + std)
})


app.get('/class/:id', (req,res,next)=>{
    res.send(`Special id: ${req.params.id}. Not sending secure info`)
})


app.use((err,req,res,next)=>{
    console.error(err.stack)//the stack enables error tracing
    res.status(500).send(`The server is broken. (this is a generic middleware because we haven't bound it to a certain route) `),
    next()
})


//specifying the port thru which our app will be deployed onto and will listen to 
app.listen(PORT, ()=>{
    console.log(`Server is running on port ${PORT}!`);
   // console.table(data)//this data is only logged out in the terminal and not in the console log browser because Express is purposed to abstract info from the client
} )  