console.log(window.location)
const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get('cod')

//buscar el array agenda del localstorage
const agenda = JSON.parse(localStorage.getItem('agendaKey'))
//buscar dentro del array el objeto que tiene el id del parametro. (find)
const contactoBuscado = agenda.find((contacto)=> contacto.id === id)
//dibujar la card con los datos

const card = document.querySelector('.card')

card.innerHTML= `<div class="row g-0">
              <div class="col-md-4">
                <img
                  src="${contactoBuscado.imagen}"
                  class="img-fluid rounded-start"
                  alt="${contactoBuscado.nombre}, ${contactoBuscado.apellido}"
                />
              </div>
              <div class="col-md-8">
                <div class="card-body">
                  <h5 class="card-title">
                    Contacto: ${contactoBuscado.nombre}, ${contactoBuscado.apellido}
                  </h5>
                  <ul>
                    <li><b>Email:</b> ${contactoBuscado.email}</li>
                    <li><b>Teléfono:</b> ${contactoBuscado.telefono}</li>
                    <li><b>Notas:</b> ${contactoBuscado.notas}</li>
                  </ul>
                </div>
              </div>
            </div>`