const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const helpers = require("../helpers");

const proyectosController = require("../controllers/proyectosController");
const tareasController = require("../controllers/tareasController");
const usuariosController = require("../controllers/usuariosController");
const authController = require("../controllers/authController");

module.exports = function () {
	router.get(
		"/",
		authController.usuarioAutenticado,
		helpers.obtenerProyectos,
		proyectosController.proyectosHome
	);
	router.get(
		"/nuevo-proyecto",
		authController.usuarioAutenticado,
		helpers.obtenerProyectos,
		proyectosController.formularioProyecto
	);
	router.post(
		"/nuevo-proyecto",
		authController.usuarioAutenticado,
		body("nombre").notEmpty().trim().escape(),
		proyectosController.nuevoProyecto
	);

	// listar proyectos
	router.get(
		"/proyectos/:url",
		authController.usuarioAutenticado,
		helpers.obtenerProyectos,
		proyectosController.proyectoPorUrl
	);

	// actualizar proyecto
	router.get(
		"/proyecto/editar/:id",
		authController.usuarioAutenticado,
		helpers.obtenerProyectos,
		proyectosController.formularioEditar
	);
	router.post(
		"/nuevo-proyecto/:id",
		authController.usuarioAutenticado,
		body("nombre").notEmpty().trim().escape(),
		proyectosController.actualizarProyecto
	);

	// eliminar un proyecto
	router.delete(
		"/proyectos/:url",
		authController.usuarioAutenticado,
		proyectosController.eliminarProyecto
	);

	// Tareas
	router.post(
		"/proyectos/:url",
		authController.usuarioAutenticado,
		tareasController.agregarTarea
	);

	// actualizar tarea
	router.patch(
		"/tareas/:id",
		authController.usuarioAutenticado,
		tareasController.cambiarEstadoTarea
	);

	// eliminar tarea
	router.delete(
		"/tareas/:id",
		authController.usuarioAutenticado,
		tareasController.eliminarTarea
	);

	// Crear nueva cuenta
	router.get("/crear-cuenta", usuariosController.formCrearCuenta);
	router.post("/crear-cuenta", usuariosController.crearCuenta);
	router.get("/confirmar/:correo", usuariosController.confirmarCuenta);

	// Iniciar sesión
	router.get("/iniciar-sesion", usuariosController.formIniciarSesion);
	router.post("/iniciar-sesion", authController.autenticarUsuario);

	// cerrar sesión
	router.get("/cerrar-sesion", authController.cerrarSesion);

	// reestar contraseña
	router.get("/reestablecer", usuariosController.formReestablecerPassword);
	router.post("/reestablecer", authController.enviarToken);
	router.get("/reestablecer/:token", authController.validarToken);
	router.post("/reestablecer/:token", authController.actualizarPassword);

	return router;
};
