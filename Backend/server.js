const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const port = 2024;
const dbConnect = require('./config/db');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use('/',require('./routes/index.routes'));

app.listen(port, () =>{
  console.log(`Server is running on port http://localhost:${port}`);
})