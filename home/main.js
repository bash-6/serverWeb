const ip = 106
const port = 3000
async function reload (url) {
	//const res = await fetch(url);
	//const res = await fetch(`http://192.168.0.100:3000/api/v1/products/${url}`);
	const res = await fetch(`http://192.168.0.${ip}:${port}/api/productos`);
	const data = await res.json();

	//const lista = document.querySelector('#tabla tbody');	
	const DIV = document.querySelector('#grillaProductos');	
	//console.log(data);
	data.forEach(e => {
		let div = document.createElement('div')
		div.setAttribute('class','contenedor-venta')
		let figure = document.createElement('figure')
		let img = document.createElement('img')
		img.setAttribute('src',e.url)
		let figcaption = document.createElement('figcaption')
		let span = document.createElement('span')
		span.setAttribute('class','nombre')
		span.textContent =  e.descripcion
		let p = document.createElement('span')
		let p1 = document.createElement('span')
		p1.textContent = 's/.'
		p.setAttribute('class','precio')
		p.textContent = e.precio

		let botones = document.createElement('div')
		botones.setAttribute('class','contenedor-botones')
		let btnMas = document.createElement('button')
		btnMas.setAttribute('class','add')
		btnMas.textContent = '+'
		let btnMenos = document.createElement('button')
		btnMenos.setAttribute('class','rest')
		btnMenos.textContent = '-'
		let input = document.createElement('input')
		input.setAttribute('type','number')
		input.setAttribute('class','cantidad')
		input.setAttribute('placeholder','0')

		botones.appendChild(btnMas)
		botones.appendChild(input)
		botones.appendChild(btnMenos)

		let contenedorTotal = document.createElement('div')
		contenedorTotal.setAttribute('class','contenedor-subtotal')
		let simboloTotal = document.createElement('span')
		simboloTotal.textContent = 's/. '
		contenedorTotal.appendChild(simboloTotal)
		let total = document.createElement('span')
		total.setAttribute('class','subtotal')
		total.textContent = '0.0'
		let agregar = document.createElement('button')
		agregar.setAttribute('disabled','true')
		agregar.setAttribute('class','agregar')
		agregar.style.backgroundColor = 'red'
		agregar.style.opacity = '.9'
		agregar.style.color = 'white'
		agregar.textContent = 'agregar al carrito'
		figure.appendChild(img)
		figcaption.appendChild(span)
		figcaption.appendChild(p1)
		figcaption.appendChild(p)
		figure.appendChild(figcaption)

		div.appendChild(figure)
		div.appendChild(botones)
		contenedorTotal.appendChild(total)
		div.appendChild(contenedorTotal)
		div.appendChild(agregar)
		
		DIV.appendChild(div)

	})
//document.querySelector('.agregar').addEventListener('click',()=>{console.log('hola');})

function operar(a,b){
	return (Math.abs(Number(a)) * Math.abs(Number(b))).toFixed(2)
}
let grilla = document.querySelector('#grillaProductos')
let inputs = [...grilla.querySelectorAll('input')]
inputs.forEach(e=>{
	e.addEventListener('input',(e)=>{
		let card = e.target.parentElement.parentElement
		console.log('click');
		let cantidad = card.querySelector('.cantidad')
		let subtotal = card.querySelector('.subtotal')
		card.querySelector('.agregar').disabled = false
		card.querySelector('.agregar').style.backgroundColor = 'green'
		card.querySelector('.agregar').style.opacity = '.9'
		let precio = card.querySelector('.precio')
		let itemsvalor = Number(cantidad.value);
		//subtotal.textContent = (itemsvalor * Number(precio.textContent)).toFixed(2)
		subtotal.textContent = operar(itemsvalor,precio.textContent)
	})
})

let grid = document.querySelector('#grillaProductos')
let btns = [...grid.querySelectorAll('button')]
let codigo = 0

btns.forEach(btn => {
	btn.addEventListener('click',(e) => {
		let card = e.target.parentElement.parentElement;
		let cantidad = card.querySelector('.cantidad')
		let subtotal = card.querySelector('.subtotal')
		let precio = card.querySelector('.precio')

			let actual = Number(cantidad.value);
		if (e.target.getAttribute('class') === 'add') {
			actual++
			card.querySelector('.agregar').disabled = false
			cantidad.value = actual; 
			subtotal.textContent = (actual * Number(precio.textContent)).toFixed(2)
			card.querySelector('.agregar').disabled = false
			card.querySelector('.agregar').style.backgroundColor = 'green'
			/*
			setTimeout(()=>{
				card.querySelector('.cantidad').value = ''
			},5000);
			console.log('click');
			*/
		}
		if (e.target.getAttribute('class') === 'rest') {
			//let actual = Number(cantidad.value);
			if (actual === 0) {
				actual = 0;
				card.querySelector('.agregar').style.backgroundColor = 'red'
				card.querySelector('.agregar').disabled = true
				/*
			setTimeout(()=>{
				card.querySelector('.cantidad').value = ''
			},5000);
			*/
			}else {
				if (actual === 1) {
					card.querySelector('.agregar').style.backgroundColor = 'red'
							card.querySelector('.agregar').disabled = true
						}
				actual--
				cantidad.value = actual; 
				subtotal.textContent = (actual * Number(precio.textContent)).toFixed(2)
				
			//card.querySelector('.agregar').style.backgroundColor = 'red'
			//card.querySelector('.agregar').disabled = true
				/*
			setTimeout(()=>{
				card.querySelector('.cantidad').value = ''
			},5000);
			*/
			}
		}
		if (e.target.getAttribute('class') === 'agregar') {
			console.log('en agregar');
			let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
			let card = e.target.parentElement
			let subtotal = card.querySelector('.subtotal').textContent
			let nombre = card.querySelector('.nombre').textContent
			let cantidad = card.querySelector('.cantidad').value
			card.querySelector('.agregar').disabled = false

			totalItems.push({
				codigo: codigo,
				precio: Number(subtotal),
				cantidad: Number(cantidad),
				nombre: nombre ,
			})
			codigo++;
			localStorage.setItem('productos',JSON.stringify(totalItems))
			conteoItems()
			cantidad = card.querySelector('.cantidad').value = ''
			card.querySelector('.agregar').textContent = 'agregado'
			card.querySelector('.agregar').style.backgroundColor = 'orange'
			card.querySelector('.agregar').style.opacity = '.9'
			subtotal = card.querySelector('.subtotal').innerHTML = '0.0'
			setTimeout(()=>{
				card.querySelector('.agregar').textContent = 'agregar al carrito'
				card.querySelector('.agregar').style.backgroundColor = 'red'
				card.querySelector('.agregar').style.opacity = '.6'
				card.querySelector('.agregar').setAttribute('disabled', 'true')
			},1000)
		}
	})
})
}
function actualBoton(){
	document.querySelector('#api').style.transform = 'translateY(-125%)'
	document.querySelector('#menuBtn').classList.add('fa-bars')
	document.querySelector('#menuBtn').classList.remove('fa-xmark')
}
let botones = [...document.querySelectorAll('button')]
botones.forEach(e =>{
	//e.addEventListener('click',reload)
	e.addEventListener('click',()=>{
	const DIV = document.querySelector('#grillaProductos');	
	switch(e.id){
		case 'atun':
			DIV.innerHTML = ''
			reload(e.id);
			actualBoton()
			break;
		case 'menestra':
			DIV.innerHTML = ''
			reload(e.id);
			actualBoton()
			break;
		case 'lacteo':
			DIV.innerHTML = ''
			reload(e.id);
			actualBoton()
			break;
		case 'aceite':
			DIV.innerHTML = ''
			reload(e.id);
			actualBoton()
			break;
		default:
			DIV.innerHTML = ''
			reload('');
			actualBoton()
	}
	})
		
})
	

//conteo de total de intems
function conteoItems() {
	let numeroVentas = document.querySelector('#numeroVentas');
	let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
	numeroVentas.textContent = totalItems.length
}

let verCarrito = document.querySelector('#mensajeCarrito')
verCarrito.addEventListener('click',render)


function clean(){
	[...document.querySelectorAll('input')].forEach(e => {
		e.value = '';
	})
	//conteoItems()
}

document.addEventListener('DOMContentLoaded',()=>{
	const DIV = document.querySelector('#grillaProductos');	
	clean();
			DIV.innerHTML = ''
			reload('');
	conteoItems()
	document.querySelector('#api').style.transform = 'translateY(-120%)'
})
//cerrar LISTA DE COMPRAS

let close = document.querySelector('#cancelar')
close.addEventListener('click',()=>{
	document.querySelector('#listaCompras').style.display = 'none'
	document.querySelector("body").style.overflow = 'visible';
})
//


//ver carrito
function render(){
	//document.querySelector('#efectivo').focus()
	document.querySelector('#listaCompras').style.display = 'grid'
	document.querySelector("body").style.overflow = 'hidden';
let verLista = document.querySelector('#tableBody')
	verLista.innerHTML = ''
	//==========
	//let s1 = document.createElement('span')
	//==========

	//trayendo desde localstorage
	let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
	
		let resultado = document.createElement('span')
		resultado.setAttribute('class','monto')
		//resultado.textContent = 
	  document.querySelector('#total').textContent = totalItems.reduce((a, b) => +a + +b.precio, 0).toFixed(2);
		//verLista.appendChild(P)
	totalItems.forEach(item => {
		let p = document.createElement('p')
		p.setAttribute('id','bodyTable')
		p.setAttribute('codigo',item.codigo)
		let nombre = document.createElement('span')
		let cantidad = document.createElement('span')
		let precio = document.createElement('span')
		let botonBorrar = document.createElement('span')
		let btn = document.createElement('button')
		let icon = document.createElement('i')
		icon.setAttribute('class','fa-solid fa-trash-can')
		btn.appendChild(icon)
		botonBorrar.appendChild(btn)


		nombre.textContent = item.nombre;
		cantidad.textContent = item.cantidad;
		precio.textContent = item.precio;

		p.appendChild(nombre)
		p.appendChild(cantidad)
		p.appendChild(precio)
		p.appendChild(botonBorrar)
		verLista.appendChild(p)
	})
//eliminar extras
let bodyTabla = document.querySelector('#tableBody');
let botonesDelete = [...bodyTabla.querySelectorAll('button')] 
botonesDelete.forEach(e => {
	e.addEventListener('click',(e)=>{
		let id = e.target.parentElement.parentElement.getAttribute('codigo')
		let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
		 let i = 0
			totalItems.forEach(e => {
				if(e.codigo === id) {
					i = totalItems.indexOf(e)
					}
				})
			totalItems.splice(i,1)
		localStorage.setItem('productos',JSON.stringify(totalItems))
		document.querySelector('#efectivo').value = ''
		document.querySelector('#vuelto').textContent = '0.0'
		render()
		conteoItems()
	})
})
}
//enviando sms
function datosParaSms(numero,body){
	document.querySelector('#enviarSms').addEventListener('click',()=>{
		document.querySelector('#enviarSms').setAttribute('href',`sms:${numero}?body=${body}`)
	})
}
//sacar cuenta
let botonPagar = document.querySelector('#pagar')
	let sms = ''
botonPagar.addEventListener('click',()=>{
let efectivo = Number(document.querySelector('#efectivo').value)
	let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
	let totalBruto = totalItems.reduce((a, b) => +a + +b.precio, 0);
	let vuelto = document.querySelector('#vuelto')
	vuelto.innerHTML = ''
	vuelto.textContent = Math.abs(efectivo - totalBruto)
	document.querySelector('#cancelar').style.display = 'none'

	//construyendo cuerpo del mensaje
	let montoTotal = Math.abs(efectivo - totalBruto)
	let TOTALITEMS = JSON.parse(localStorage.getItem('productos')) || [];
	TOTALITEMS.forEach(e =>{
		sms+= ` ${e.nombre} = ${e.cantidad}; `
	})
	
	sms+= `TOTAL=${montoTotal}`

	//console.log(sms);
	})

	document.querySelector('#enviarSms').addEventListener('click',()=>{
	let numero = document.querySelector('#infoTelefonico').value
	//console.log(sms,numero);
	//<a href="https://api.whatsapp.com/send?phone=51988113522&text=Hola,%20¿Qué%20tal%20%estás?">enviar</a>
	//document.querySelector('#enviarSms').setAttribute('href',`sms:${numero}?body=${sms}`)
	document.querySelector('#enviarSms').setAttribute('href',`https://api.whatsapp.com/send?phone=51${numero}&text=${sms}`)
})

//cancelar operacion
let cancelar = document.querySelector('#eliminar')
cancelar.addEventListener('click',()=>{
	let totalItems = JSON.parse(localStorage.getItem('productos')) || [];
	totalItems = [];
	localStorage.setItem('productos',JSON.stringify(totalItems))
	location.reload()
})


//menu bar
document.querySelector('#menuBtn').addEventListener('click',(e)=>{
	if (e.target.classList.contains('fa-bars')){
		document.querySelector('#api').style.transform = 'translateY(0%)'
		e.target.classList.remove('fa-bars')
		e.target.classList.add('fa-xmark')
	}else {	
		document.querySelector('#api').style.transform = 'translateY(-120%)'
		e.target.classList.add('fa-bars')
		e.target.classList.remove('fa-xmark')
	}
})

function $(node) { return document.querySelector(node) }

$('#descripcionitem').addEventListener('keyup',(e)=>{
	nodo = [...document.querySelectorAll('.contenedor-venta')]
	nodo.forEach(p =>{
		p.style.display = 'none'
		if (e.keyCode === 8) {
			p.style.display = 'none'
		}
		if(p.textContent.indexOf(e.target.value) > -1){
			p.style.display = 'grid'
		}
	})
})

