const Sequelize = require("sequelize");
const slug = require("slug");
const shortid = require("shortid");

const db = require("../config/db");

const Proyectos = db.define(
	"proyectos",
	{
		id: {
			type: Sequelize.INTEGER(11),
			primaryKey: true,
			autoIncrement: true,
		},
		nombre: Sequelize.STRING(100),
		url: Sequelize.STRING(100),
	},
	{
		hooks: {
			beforeCreate(proyecto) {
				const url = slug(proyecto.nombre).toLocaleLowerCase();
				proyecto.url = `${url}-${shortid.generate()}`;
			},
			beforeUpdate(proyecto) {
				const url = slug(proyecto.nombre).toLocaleLowerCase();
				proyecto.url = `${url}-${shortid.generate()}`;
			},
		},
	}
);

module.exports = Proyectos;
