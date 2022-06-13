const cors = require('cors'),
	fs = require('fs'),
	products = require('./data/products.json'),
	{ v4: uuidv4 } = require('uuid'),
	express = require("express"),
  app = express(),//construir la aplicacion
  //port = process.env.PORT || 3000;
  port = 3000;

function writeDataToFile(filename, content) {
    fs.writeFileSync(filename, JSON.stringify(content), 'utf8', (err) => {
        if(err) {
            console.log(err)
        }
    })
}

function create(product) {
    return new Promise((resolve, reject) => {
        const newProduct = {id: uuidv4(), ...product}
        products.push(newProduct)
				/*
        if (process.env.NODE_ENV !== 'test') {
            writeDataToFile('./data/products.json', products);
        }
				*/
				writeDataToFile('./data/products.json', products);
        resolve(newProduct)
    })
}

function find(){
	return new Promise((resolve, reject) => {
		resolve(products)
	})
}
  function Delete(id){
    const index = products.findIndex(item => item.id === id);
		/*
    if( index === -1 ){
      //throw new Error('product not found');
      throw boom.notFound('product not found');
    }
		*/

    products.splice(index, 1);
    return {id};
  };

function update(id, changes){
	const i = products.findIndex(item => item.id === id)
	const oldProduct = products[i]
	products[i] = {
		...oldProduct,
		...changes
	}
	writeDataToFile('./data/products.json', products);
	return products[i]
}

app.use(express.json());
app.use(cors());//acepta cualquier origen


app.get('/', async (req, res) => {
	const todos = await find()
	res.sendFile(__dirname + '/home/index.html')
	//res.status(201).json(todos)
})
app.get('/ingresar', async (req, res) => {
	const todos = await find()
	res.sendFile(__dirname + '/productos/index.html')
	//res.status(201).json(todos)
})
app.get('/api/productos', async (req, res) => {
	const todos = await find()
	//res.sendFile(__dirname + '/html/index.html')
	res.status(201).json(todos)
})

app.post("/api/productos", async (req, res) => {//callback para respoder a la peticion GET
        const body = await req.body
	
        const { descripcion, precio, unidad, url } = body
        const product = {
          descripcion,
					precio,
					unidad,
					url,
        }
        const newProduct = await create(product)
				res.status(201).json(newProduct)
});

app.patch('/api/productos/:id', async (req, res) => {
	const {id} = req.params
	const body = req.body
	const product = await update(id, body)
	res.status(201).json(product)
})

app.delete('/api/productos/:id', async (req, res) => {
  const {id} = req.params;
  const rta =  await Delete(id);
  res.json(rta);
});

app.get('/home/style.css',(req,res)=>{
	res.sendFile(__dirname + '/home/style.css')
})
app.get('/home/normalize.css',(req,res)=>{
	res.sendFile(__dirname + '/home/normalize.css')
})
app.get('/home/main.js',(req,res)=>{
	res.sendFile(__dirname + '/home/main.js')
})

app.get('/productos/style.css',(req,res)=>{
	res.sendFile(__dirname + '/productos/style.css')
})
app.get('/productos/normalize.css',(req,res)=>{
	res.sendFile(__dirname + '/productos/normalize.css')
})
app.get('/productos/main.js',(req,res)=>{
	res.sendFile(__dirname + '/productos/main.js')
})



app.listen(port, () => {
  console.log("Mi port", port);//los console.log no deberian verse en produccion solo en desarrollo.
})
