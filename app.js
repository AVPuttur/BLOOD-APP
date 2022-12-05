require("dotenv").config();
const express = require("express");
const csvMssql = require("mssql-to-csv");
const cors = require('cors');
const cron = require("node-cron");
const axios = require('axios');
const dbConfig = require("./dbconfig");
const fs = require('fs-extra')
const helmet = require('helmet')
const db = require("./models");
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//db.sequelize.sync();

// db.sequelize.sync({force: true}).then(() =>{
//     console.log("Drop table and re-sync db.")
// });

//Routes
require("./routes/user.routes.js")(app);
require("./routes/donor.routes.js")(app);
require("./routes/event.routes.js")(app);

app.get("/test", (req, res) => {
    res.send({message: "Blood middleware running!"});
});

// //Server listening
app.listen(process.env.SERVER_PORT, (req, res) => {
    console.log('Middleware running on http://localhost:' + process.env.SERVER_PORT);
});




