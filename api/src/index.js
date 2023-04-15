const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const cors = require("cors");
const routeconfig = require("./routeconfig/config");
const rateLimit = require("express-rate-limit");
const { globalError } = require("./Generic/errorGeneric");
const dotenv = require("dotenv");
dotenv.config();
const { sequelize } = require("../models");
const bodyParser = require("body-parser");
const schedule = require("node-schedule");
const ctrlDebtsClient = require("./controller/debtClient.controller");
const ctrlDebtsOwner = require("./controller/debtOwner.controller");

const app = express();

app.use(morgan("dev"));

const Port = 4000;
app.set("port", process.env.PORT || Port);
app.use(express.static(__dirname + "/uploads"));
app.use(bodyParser.json({ limit: "50mb", }));
app.use(bodyParser.urlencoded({ limit: "50mb", parameterLimit: 100000, extended: true, }));
var corsOptions = { origin: "*", optionsSuccessStatus: 200, };
app.use(cors(corsOptions));
app.use(helmet());
app.use(express.json());

//Routes
app.use(routeconfig);
app.all("*", (req, res, next) => res.json(next(new Error(`can´t find the url ${req.originalUrl} for this server...`))));

//Global error
app.use(globalError);

// * * * * * -- para ejecutar a cada minuto
// 0 0 1 * * --  se ejecutara todo el primer dia de cada mes a las 12:00 am

schedule.scheduleJob("0 0 1 * *", function () {
  ctrlDebtsClient.jobDebtsClients();
  ctrlDebtsOwner.jobDebtsOwner();
});

// schedule.scheduleJob("* * * * *", function () {
//   // return ctrl.jobDebtsClients();
//   ctrlDebtsClient.jobDebtsClients();
//   ctrlDebtsOwner.jobDebtsOwner();
// });

//Starting
app.listen(app.get("port"), () => {
  console.log("APP RUNNING ON PORT : ", app.get("port"), "  MODE : ", process.env.NODE_ENV);
  // sequelize
  //   .sync({ force: true, })
  //   .then(() => { console.log('DB IS CONNECTED.') })
  //   .catch((err) => { console.log(err) })
});

//   TODO:  add restrictions
