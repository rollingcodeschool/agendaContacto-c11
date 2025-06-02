import Contacto from "./classContacto.js";

// funciones
const abrirModal = () => {
  //aqui abro la ventana modal
  modalContacto.show();
  //cambie la variabl para que cree contactos
  creandoContacto = true;
};

const crearContacto = () => {
  //todo: tomar los datos del formulario y validarlos
  //con los datos voy a crear un objeto contacto
  const contactoNuevo = new Contacto(
    inputNombre.value,
    inputApellido.value,
    inputTelefono.value,
    inputEmail.value,
    inputImagen.value,
    inputNotas.value
  );
  //guardar el contacto en un array
  agenda.push(contactoNuevo);
  console.log(agenda);
  //guardar la agenda en localstorage
  guardarLocalStorage();
  //dibujar este contacto nuevo en la tabla
  dibujarFila(contactoNuevo, agenda.length);
  limpiarFormulario();
  // mostrar un mensaje al usuario indicando que se creo el contacto
  Swal.fire({
    title: "Contacto creado",
    text: `El contacto ${contactoNuevo.nombre}, fue creado correctamente`,
    icon: "success",
  });
};

const limpiarFormulario = () => {
  formularioContacto.reset();
};

const guardarLocalStorage = () => {
  localStorage.setItem("agendaKey", JSON.stringify(agenda));
};

const cargarDatosTabla = () => {
  //verificar si la agenda tiene datos
  if (agenda.length !== 0) {
    //dibujar una fila por cada contacto de la agenda
    agenda.map((contacto, indice) => dibujarFila(contacto, indice + 1));
  }
  //si no hay datos en la agenda mostrar un mensaje al usuario
};

const dibujarFila = (contacto, indice) => {
  console.log(contacto);
  //agregar una fila (tr) nueva al tbody de la tabla de contactos
  tablaContactos.innerHTML += `<tr>
              <th scope="row">${indice}</th>
              <td>${contacto.nombre}</td>
              <td>${contacto.apellido}</td>
              <td>${contacto.telefono}</td>
              <td>${contacto.email}</td>
              <td>
                <button class="btn btn-warning" onclick="prepararContacto('${contacto.id}')">Editar</button>
                <button class="btn btn-danger" onclick="eliminarContacto('${contacto.id}')">Borrar</button>
                <button class="btn btn-info">Ver</button>
              </td>
            </tr>`;
};

window.eliminarContacto = (id) => {
  Swal.fire({
    title: "Estas por eliminar un contacto",
    text: "si decides eliminar, no puedes revertir este paso",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#78c2ad",
    cancelButtonColor: "#ff7851",
    confirmButtonText: "Borrar",
    cancelButtonText: "Salir",
  }).then((result) => {
    if (result.isConfirmed) {
      //buscar y borrar el contacto del array agenda
      const posicionContactoBuscado = agenda.findIndex(
        (contacto) => contacto.id === id
      );
      agenda.splice(posicionContactoBuscado, 1);
      //actualizar el localstorage
      guardarLocalStorage();
      //actualizar la tabla de contactos
      console.log(posicionContactoBuscado);
      tablaContactos.children[posicionContactoBuscado].remove();
      //todo: corregir las celdas de la tabla cuando borramos un contacto
      //Recorrer las filas restantes y actualizar sus índices
      const filasRestantes = tablaContactos.children;
      for (let i = 0; i < filasRestantes.length; i++) {
        const celdaIndice = filasRestantes[i].querySelector("th");
        if (celdaIndice) {
          celdaIndice.textContent = i + 1; // Actualiza el texto con el nuevo índice
        }
      }
    }
  });
};

window.prepararContacto = (id) => {
  console.log("aqui tengo que preparar el contacto", id);
  //cargar los datos en el modal
  const contactoBuscado = agenda.find((contacto) => contacto.id === id);
  inputNombre.value = contactoBuscado.nombre;
  inputApellido.value = contactoBuscado.apellido;
  inputEmail.value = contactoBuscado.email;
  inputTelefono.value = contactoBuscado.telefono;
  inputNotas.value = contactoBuscado.notas;
  inputImagen.value = contactoBuscado.imagen;
  //abrir el modal
  abrirModal();
  //guardo el id del contacto que quiero editar
  idContactoEditar = id;
  creandoContacto = false;
};

const editarContacto = () => {
  console.log("aqui debo agregar la logica que edite al contacto en el array");
  //agarrar los datos del formulario y actualizarlos dentro del array agenda
  const posicionContacto = agenda.findIndex(
    (contacto) => contacto.id === idContactoEditar
  );
  console.log(posicionContacto);
  agenda[posicionContacto].nombre = inputNombre.value;
  agenda[posicionContacto].apellido = inputApellido.value;
  agenda[posicionContacto].telefono = inputTelefono.value;
  agenda[posicionContacto].email = inputEmail.value;
  agenda[posicionContacto].notas = inputNotas.value;
  agenda[posicionContacto].imagen = inputImagen.value;

  //actualizar el localstorage
  guardarLocalStorage();
  //limpiar el formulario
  limpiarFormulario();
  //cerrar el modal
  modalContacto.hide();
  //actualizar la tabla de contacto
  // Actualizar SOLO la fila de la tabla correspondiente al contacto editado
  const filaEditada = tablaContactos.children[posicionContacto];
  if (filaEditada) {
    filaEditada.children[1].textContent = agenda[posicionContacto].nombre;
    filaEditada.children[2].textContent = agenda[posicionContacto].apellido;
    filaEditada.children[3].textContent = agenda[posicionContacto].telefono;
    filaEditada.children[4].textContent = agenda[posicionContacto].email;
  }

  //agregar un mensaje al usuario
  Swal.fire({
    title: "Contacto modificado",
    text: `El contacto ${agenda[posicionContacto].nombre} fue modificado correctamente`,
    icon: "success",
  });
};

//declarar variables
const modalContacto = new bootstrap.Modal(
  document.getElementById("modalContacto")
);
const btnAgregar = document.getElementById("btnAgregar");
const formularioContacto = document.querySelector("form");
const inputNombre = document.querySelector("#nombre");
const inputApellido = document.querySelector("#apellido");
const inputEmail = document.querySelector("#email");
const inputTelefono = document.querySelector("#telefono");
const inputNotas = document.querySelector("#notas");
const inputImagen = document.querySelector("#imagen");
const agenda = JSON.parse(localStorage.getItem("agendaKey")) || [];
const tablaContactos = document.querySelector("tbody");
let idContactoEditar = null;
let creandoContacto = true;

//agrego los manejadores de eventos
btnAgregar.addEventListener("click", abrirModal);
formularioContacto.addEventListener("submit", (e) => {
  e.preventDefault();
  if (creandoContacto) {
    //aqui voy a crear un contacto
    crearContacto();
  } else {
    editarContacto();
  }
  //algun dia aqui voy a editar un contacto
});

//resto de la logica
cargarDatosTabla();
