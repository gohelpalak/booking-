require('dotenv').config();
const express = require('express');
// const dotenv = require('dotenv');
const mongoose = require('mongoose');
// dotenv.config();
const cors = require('cors');
// const PORT = 2024;
const dbConnect = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/',require('./routes/index.routes'));
// server.js (Add this inside the main file where other routes are defined)


app.listen(process.env.PORT, () =>{
  console.log(`Server is running on port http://localhost:${process.env.PORT}`);
})