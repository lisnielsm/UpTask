const Proyectos = require("./models/Proyectos");

exports.vardump = (objeto) => JSON.stringify(objeto, null, 2);

exports.obtenerProyectos = async (req, res, next) => {
	const usuarioId = res.locals.usuario.id;
	const proyectos = await Proyectos.findAll({ where: { usuarioId } });
	req.proyectos = proyectos;
	next();
};
