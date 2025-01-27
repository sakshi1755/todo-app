const express= require('express');
const mongoose=require('mongoose');
const cors=require('cors');
require('dotenv').config();

const app= express();
app.use(cors());
app.use(express.json());


mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected'))
  .catch((err) => console.log(err));

const todoroutes=require("./routes/todoroutes.js");
app.use('/api/todos', todoroutes);

app.listen(5000, ()=>{console.log("server running on port 5000")});
