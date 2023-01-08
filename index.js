const express = require("express");
const routes = require("./routes"); // importar las rutas
const path = require("path");
const bodyParser = require("body-parser");
const flash = require("connect-flash");
const cookieParser = require('cookie-parser');
const session = require('express-session');
const passport = require('./config/passport');

// helper con algunas funciones
const helpers = require("./helpers");

// crear la conexion a la db
const db = require("./config/db");

// importar el modelo
require("./models/Proyectos");
require("./models/Tareas");
require("./models/Usuarios");

db.sync()
	.then(() => console.log("DB Conectada"))
	.catch((error) => console.log(error));

// crear una app de express
const app = express();

// habilitar bodyParser para leer los datos del formulario
app.use(bodyParser.urlencoded({ extended: true }));

// donde cargar los archivos estaticos
app.use(express.static("public"));

// habilitar pug
app.set("view engine", "pug");

// anadir la carpeta de las vistas
app.set("views", path.join(__dirname, "./views"));

// agregar flash messages
app.use(cookieParser());
app.use(session({ 
    secret: "supersecreto",
    resave: false,
    saveUninitialized: false
 }));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());

// pasar var dump a la aplicacion
app.use((req, res, next) => {
	res.locals.vardump = helpers.vardump;
	res.locals.mensajes = req.flash();
	res.locals.usuario = {...req.user} || null;
	next();
});

app.use("/", routes()); // use the routes

const PORT = 5000;

app.listen(PORT, () => {
	console.log(`El servidor esta funcionando en el puerto ${PORT}`);
});
