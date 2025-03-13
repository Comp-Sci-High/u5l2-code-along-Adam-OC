const express = require("express");
// import your mongoose
const mongoose = require("mongoose")
// install your mongoose

const app = express();

app.use((req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// create a studentSchema with name, grade, advisory, and fav subject

const studentSchema = new mongoose.Schema({
  name : {type: String, required: true },
  grade : {type: Number, defualt: 9},
  favSub : {type: String, required: true }
})

// connect your schema to a model called Student

const Student = mongoose.model("Student", studentSchema, "Students")

// create a route hanlder for /g12 that returns every student in grade 12

app.get("/g12", async (req,res) =>{ 
  const students = await Student.find({grade: 12})
  res.json(students)
}) 

// (OYO) create a route hanlder for /me that returns yourself without using your name in the query

app.get("/me", async (req,res) => {
  const Adam = await Student.findOne({grade:12},{favSub:"APCalc"})
  res.json(Adam)
})

// (OYO) create a route hanlder for /friend that returns someone at your table using their name in the query

app.get("/friend", async (req,res) =>{
  const friend = await Student.findOne({name:"Oscar"})
  res.json(friend)
})

// Write an async function called startServer
// inside make sure to connect to mongoose w/ your SRV string
// (make sure your call you name your database myClass!)
// Save a document to mongoDB about yourself 
// (OYO) save 2 more documents about students at your table
// make sure to start your server 
async function startServer() {
  await mongoose.connect("mongodb+srv://SE12:CSH2025@adamo8.b6ydo.mongodb.net/?retryWrites=true&w=majority&appName=AdamO8")

  const me = await new Student({
    name: "Oscar",
    grade: 12,
    favSub: "ApCalc"
  }).save()


  app.listen(3000, () => {
    console.log("server running")
  })

}

// call startServer
startServer()
// if you finished all the excersizes try these 
