// load env variables
if (process.env.NODE_ENV != "production") {
  require("dotenv").config();
}

//import dependencies

const express = require("express");
const connectToDb = require("./src/config/connectToDb")
const goalRoutes = require('./src/routes/goals')
const port = process.env.PORT || '3000';

//create an express app
const app = express();

//connect to database
connectToDb();


// global middleware

app.use(express.json())

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next()
})

//routes
app.use('/api/goals', goalRoutes)

app.listen(port, () => {
  console.log('listening on port', process.env.PORT)
})
