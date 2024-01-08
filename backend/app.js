const express = require('express');
const cors = require('cors');
const env = require('dotenv').config();
const bodyParser = require('body-parser');
const db = require('./Config/db');
const router = require('./Routes/routes');
const morgan = require('morgan');

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use('/', router);

const port = process.env.PORT;

app.listen(port, () => {
    console.log((`Server is connected to ${port}`));
})