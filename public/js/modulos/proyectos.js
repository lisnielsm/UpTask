import Swal from "sweetalert2";
import axios from "axios";

const btnEliminar = document.querySelector("#eliminar-proyecto");

if (btnEliminar) {
	btnEliminar.addEventListener("click", (e) => {
		const urlProyecto = e.target.dataset.proyectoUrl;

		Swal.fire({
			title: "¿Deseas borrar este proyecto?",
			text: "Un proyecto eliminado no se puede recuperar",
			icon: "warning",
			showCancelButton: true,
			confirmButtonColor: "#3085d6",
			cancelButtonColor: "#d33",
			confirmButtonText: "Si, Borrar",
			cancelButtonText: "No, Cancelar",
		}).then((result) => {
			if (result.value) {
				// Enviar petición a axios
				const url = `${location.origin}/proyectos/${urlProyecto}`;

				axios
					.delete(url, { params: { urlProyecto } })
					.then(function (respuesta) {
						Swal.fire(
							"Proyecto Eliminado",
							respuesta.data,
							"success"
						);

						// Redireccionar al inicio
						setTimeout(() => {
							window.location.href = "/";
						}, 3000);
					})
					.catch(() => {
						Swal.fire({
							icon: "error",
							title: "Hubo un error",
							text: "No se pudo eliminar el proyecto",
						});
					});
			}
		});
	});
}

export default btnEliminar;
