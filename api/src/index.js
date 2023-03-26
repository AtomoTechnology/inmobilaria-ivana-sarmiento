const express = require('express')
const helmet = require('helmet')
const morgan = require('morgan')
const cors = require('cors')
const routeconfig = require('./routeconfig/config')
const rateLimit = require('express-rate-limit')
const {
	globalError
} = require('./Generic/errorGeneric')
const dotenv = require('dotenv')
dotenv.config()
const {
	sequelize
} = require('../models')
const bodyParser = require('body-parser')
const schedule = require('node-schedule');
const ctrl = require('./controller/debtClient.controller');

const app = express()

app.use(morgan('dev'))

const Port = 4000
app.set('port', process.env.PORT || Port)
app.use(express.static(__dirname + '/uploads'))

// Limit
app.use(
	bodyParser.json({
		limit: '50mb',
	})
)

app.use(
	bodyParser.urlencoded({
		limit: '50mb',
		parameterLimit: 100000,
		extended: true,
	})
)

const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
	message: 'Demasiadas cuentas creadas a partir de esta IP, intente nuevamente después de una hora',
	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
})

// Apply the rate limiting middleware to all requests
app.use(limiter)

var corsOptions = {
	origin: '*',
	optionsSuccessStatus: 200, // For legacy browser support
}
app.use(cors(corsOptions))
app.use(helmet())
app.use(express.json())

//Routes
app.use(routeconfig)

app.all('*', (req, res, next) => {
	return res.json(next(new Error(`can´t find the url ${req.originalUrl} for this server...`)))
})
//Global error
app.use(globalError)

// * * * * * -- para ejecutar a cada minuto
// 0 0 1 * * --  se ejecutara todo el primer dia de cada mes a las 12:00 am

schedule.scheduleJob("0 0 1 * *", function () {
	return ctrl.jobDebtsClients();
});

//Starting
app.listen(app.get('port'), () => {
	console.log(' server on port', app.get('port'), '  MODE : ', process.env.NODE_ENV)

	//Connection to bd
	// sequelize
	// 	.sync({
	// 		alter: true,
	// 	})
	// 	.then(() => {
	// 		console.log('DB is conected')
	// 	})
	// 	.catch((err) => {
	// 		console.log(err)
	// 		return
	// 	})
})

//   TODO:  add restrictions