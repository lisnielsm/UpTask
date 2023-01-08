const Proyectos = require("../models/Proyectos");
const Tareas = require("../models/Tareas");

exports.proyectosHome = async (req, res) => {
	res.render("index", {
		nombrePagina: "Proyectos",
		proyectos: req.proyectos,
	});
};

exports.formularioProyecto = async (req, res) => {
	res.render("nuevoProyecto", {
		nombrePagina: "Nuevo Proyecto",
		proyectos: req.proyectos,
	});
};

exports.nuevoProyecto = async (req, res) => {
	// validar que tengamos algo en el input
	const { nombre } = req.body;

	let errores = [];

	if (!nombre) {
		errores.push({ texto: "Agrega un nombre al proyecto" });
	}

	// si hay errores
	if (errores.length > 0) {
		res.render("nuevoProyecto", {
			nombrePagina: "Nuevo Proyecto",
			proyectos: req.proyectos,
			errores,
		});
	} else {
		// no hay errores
		// insertar en la DB
		try {
			const usuarioId = res.locals.usuario.id;
			await Proyectos.create({ nombre, usuarioId });
			res.redirect("/");
		} catch (error) {
			console.log(error);
		}
	}
};

exports.proyectoPorUrl = async (req, res, next) => {
	const usuarioId = res.locals.usuario.id;

	const proyecto = await Proyectos.findOne({
		where: { url: req.params.url, usuarioId },
	});

	// consultar tareas del proyecto actual
	const tareas = await Tareas.findAll({
		where: { proyectoId: proyecto.id },
	});

	if (!proyecto) return next();

	// render a la vista
	res.render("Tareas", {
		nombrePagina: "Tareas del Proyecto",
		proyectos: req.proyectos,
		proyecto,
		tareas,
	});
};

exports.formularioEditar = async (req, res) => {
	const usuarioId = res.locals.usuario.id;
	const proyecto = await Proyectos.findOne({ where: { id: req.params.id, usuarioId } });

	res.render("nuevoProyecto", {
		nombrePagina: "Editar Proyecto",
		proyectos: req.proyectos,
		proyecto,
	});
};

exports.actualizarProyecto = async (req, res) => {
	// validar que tengamos algo en el input
	const { nombre } = req.body;

	let errores = [];

	if (!nombre) {
		errores.push({ texto: "Agrega un nombre al proyecto" });
	}

	// si hay errores
	if (errores.length > 0) {
		res.render("nuevoProyecto", {
			nombrePagina: "Nuevo Proyecto",
			proyectos: req.proyectos,
			errores,
		});
	} else {
		// no hay errores
		try {
			await Proyectos.update(
				{ nombre: nombre },
				{ where: { id: req.params.id } }
			);
			res.redirect("/");
		} catch (error) {
			console.log(error);
		}
	}
};

exports.eliminarProyecto = async (req, res, next) => {
	// req, query o params
	const { urlProyecto } = req.query;

	const resultado = await Proyectos.destroy({ where: { url: urlProyecto } });

	if (!resultado) {
		return next();
	}

	res.status(200).send("Proyecto eliminado correctamente");
};
