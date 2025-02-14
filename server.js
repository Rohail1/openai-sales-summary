// bootsraping configuration

const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const bodyParser = require('body-parser');


let app = express();
app.locals.title = "OpenAi Sales Summary";

// Setting environment variables and configuration

app.locals.env = process.env.NODE_ENV = process.env.NODE_ENV || "development";
require('dotenv').config({ path: `${app.locals.env}.env` });
const config = require('./src/Configs')(app.locals.env);


// Initializing server settings

app.use(cors());
app.use(morgan(config.logStyle));
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));
app.use(express.static('public'));


// Registering APIs

require('./src/APIs')(app, express)


// Starting Server

app.listen(config.port, () => {

  console.log("::::::::::::::::::::::::::: server Status :::::::::::::::::::::::::::::::");
  console.log("Application name: %s", app.locals.title);
  console.log("Server started on: %s", (new Date()));
  console.log("Running on port: %s", config.port);
  console.log("Environment: %s", app.locals.env);

});