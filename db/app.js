/*
*
* RUN THIS FILE TO CREATE THE DB AND POPULATE IT WITH DATA
* make sure all .csv files are in the data folder
* `node app.js`
*
*/

const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
const apiRoute = require('./routes/apiRoute');

app.use("/api", apiRoute);

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server listening on port ${PORT}...`))