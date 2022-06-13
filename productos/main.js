const port = 3000
const ip = 106
function $(node) { return document.querySelector(node) }
function $$(node) {
	return [...document.querySelectorAll(node)]
}
function C(node,clase){
	Node = document.createElement(node)
	Node.setAttribute('class',clase)
	return Node
}


$('#descripcionitem').addEventListener('keyup',(e)=>{
	nodo = [...document.querySelectorAll('.item')]
	nodo.forEach(p =>{
		p.style.display = 'none'
		if (e.keyCode === 8) {
			p.style.display = 'none'
		}
		if(p.textContent.indexOf(e.target.value) > -1){
			p.style.display = 'flex'
		}
	})
})

let form = $('#crearProducto')

//esquema de producto
//rederizar productos
async function render(nodo) {
	const res = await fetch(`http://192.168.0.${ip}:${port}/api/productos`);
	const data = await res.json();
	Nodo = $(nodo)
	Nodo.innerHTML = ''
//array de objetos 'data'
	data.forEach(i =>{
		p = C('p','item')
		p.setAttribute('id',i.id)

		edit = C('button','editar')
		edit.textContent = 'editar'

		del = C('img','eliminar')
		del.setAttribute('src',i.url)
		del.style.width = '50px'
		del.style.height = '50px'

		otrodel = C('button','otroeliminar')
		otrodel.textContent = 'eliminar'


		agregar = C('button','agregar')
		agregar.textContent = 'agregar'

		bodyDescrip = C('span','contenidoItem')
		bodyDescrip.textContent = i.descripcion
		contDescrip = C('span','descripcionItem')
		contDescrip.appendChild(bodyDescrip)

		bodyPrecio = C('span','itemPrecio')
		bodyPrecio.textContent = `PRECIO=${i.precio}`
		bodyCantidad = C('span','itemCantidad')
		bodyCantidad.textContent = `CANTIDAD=${i.unidad}`

		separador1 = C('span','|')
		separador1.textContent = '  '
		separador2 = C('span','|')
		separador2.textContent = '  '

		contDescrip.appendChild(separador1)	
		contDescrip.appendChild(bodyCantidad)
		contDescrip.appendChild(separador2)	
		contDescrip.appendChild(bodyPrecio)

		p.appendChild(contDescrip)
		p.appendChild(edit)
		p.appendChild(otrodel)
		p.appendChild(del)
		Nodo.appendChild(p)
	})	


//editar
let btnEditar = $$('.editar')
btnEditar.forEach(btn => {
	btn.addEventListener('click',(e)=>{
		console.log('editando');
		$('.editandoProducto').style.display = 'grid'
		$('.agregandoProducto').style.display = 'none'
		let form = $('#editandoProducto')
		$('.listadoProductos').style.display = 'none'
		//let storage = JSON.parse(localStorage.getItem('productos')) || [];
		fetch(`http://192.168.0.${ip}:${port}/api/productos`)
		.then(res => res.json())
		.then(data =>{
				data.forEach(i => {
					if(i.id === e.target.parentElement.id){
						form.querySelector('#id').value = i.id
						form.querySelector('#editandoDescripcion').value = i.descripcion
						form.querySelector('#editandoUrl').value = i.url
						form.querySelector('#editandoPrecio').value = i.precio
						form.querySelector('#editandoUnidad').value = i.unidad
					}
				})
		})
	})
})
	
//eliminar
let btnEliminar = $$('.otroeliminar')
btnEliminar.forEach(btn => {
	btn.addEventListener('click',(e)=>{
		let storage = JSON.parse(localStorage.getItem('productos')) || [];
		let id = e.target.parentElement.id

		/*
	let yo =[]
storage.map((e)=>{
		if(e.id != idModal){
			yo.push(e)
		}
	})
	yo.sort((a,b)=>a.id-b.id)
	localStorage.setItem('productos',JSON.stringify(yo))
	*/
	fetch(`http://192.168.0.${ip}:${port}/api/productos/${id}`, {
		  method: 'DELETE',
	})
	render('#resultado')
	})
})
	/*
	render('#resultado')
	form.reset();
	cerrarModal()
	*/

}
//

//touch submit formulario crear producto
form.addEventListener('submit',(e)=>{
	e.preventDefault()
	const data = new FormData(form)
	let body = {
			descripcion: data.get('crearDescripcion'),
			precio: data.get('crearPrecio'),
			unidad: data.get('crearUnidad'),
			url: data.get('crearUrl')
			}

	fetch(`http://192.168.0.${ip}:${port}/api/productos`, {
		method: 'POST', // or 'PUT'
		headers:{ 'Content-Type': 'application/json' },
		body: JSON.stringify(body) // data can be `string` or {object}!
	})

})

//touch submit formulario editar producto
let nuevoDatos = $('#editandoProducto')
nuevoDatos.addEventListener('submit',(e)=>{
	e.preventDefault()
	let id = nuevoDatos.querySelector('#id').value
	console.log(typeof id);
	let data = new FormData(nuevoDatos)
	let bodydata = {
		descripcion: data.get('editandoDescripcion'),
		precio: data.get('editandoPrecio'),
		unidad: data.get('editandoUnidad'),
		url: data.get('editandoUrl'),
	}
	fetch(`http://192.168.0.${ip}:${port}/api/productos/${id}`, {
		  method: 'PATCH', // or 'PUT'
		  headers:{ 'Content-Type': 'application/json' },
		  body: JSON.stringify(bodydata) // data can be `string` or {object}!
	})
	//render('#resultado')
	//form.reset();
	//cerrarModal()
	//location.reload()	
})
//mostrar formulario crear producto
document.addEventListener('DOMContentLoaded',()=>{
	render('#resultado')
})


$('#addProduct').addEventListener('click',()=>{
	$('.agregandoProducto').style.display = 'grid'
	$('.editandoProducto').style.display = 'none'
	$('.listadoProductos').style.display = 'none'
})
function cerrarModal (){
	//e.stopPropagation()
	$('.agregandoProducto').style.display = 'none'
	$('.editandoProducto').style.display = 'none'
	$('.listadoProductos').style.display = 'block'
	$('.editandoProducto').style.display = 'none'
	$('.listadoProductos').style.display = 'block'
}
$('#cancelarCrearProducto').addEventListener('click',(e)=>{
	e.preventDefault()
	location.reload()
	//cerrarModal()
})
$('#cancelaredicion').addEventListener('click',(e)=>{
	//cerrarModal()
	e.preventDefault()
	location.reload()
})
