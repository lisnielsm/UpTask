const nodemailer = require("nodemailer");
const pug = require("pug");
const juice = require("juice");
const { convert } = require("html-to-text");
const util = require("util");
require('dotenv').config({ path: '.env' });

const transport = nodemailer.createTransport({
	host: process.env.EMAIL_HOST,
	port: process.env.EMAIL_PORT,
	auth: {
		user: process.env.EMAIL_USER,
		pass: process.env.EMAIL_PASS,
	},
});

// generar html
const generarHTML = (archivo, opciones = {}) => {
	const html = pug.renderFile(
		`${__dirname}/../views/emails/${archivo}.pug`,
		opciones
	);
	return juice(html);
};

exports.enviar = async (opciones) => {
	const html = generarHTML(opciones.archivo, opciones);
	const text = convert(html);

	let opcionesEmail = {
		from: "UpTask <no-reply@uptask.com>",
		to: opciones.usuario.email,
		subject: opciones.subject,
		text,
		html,
	};

	const enviarEmail = util.promisify(transport.sendMail, transport);
	return enviarEmail.call(transport, opcionesEmail);
};
