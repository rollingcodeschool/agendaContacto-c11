console.log(window.location)
const parametroURL = new URLSearchParams(window.location.search)
const id = parametroURL.get('cod')

//buscar el array agenda del localstorage
const agenda = JSON.parse(localStorage.getItem('agendaKey'))
//buscar dentro del array el objeto que tiene el id del parametro. (find)
const contactoBuscado = agenda.find((contacto)=> contacto.id === id)
//dibujar la card con los datos
console.log(contactoBuscado)