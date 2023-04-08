const fs = require("fs")

class ProductManager{
  static ultimo_id = 0
  constructor(ruta){
    this.ruta = ruta
    this.products = []
  }
  
  addProduct = async (title, description,price,thumbnail,code,stock) => {
    ProductManager.ultimo_id = ProductManager.ultimo_id +1
    const producto_nuevo = {
      id: ProductManager.ultimo_id,
      title: title,
      description: description,
      price:price,
      thumbnail: thumbnail,
      code:code,
      stock:stock
    }
    this.products.push(producto_nuevo)
    const cadenaArchivo = JSON.stringify(this.products)
    await fs.promises.writeFile(this.ruta, cadenaArchivo)
    console.log("Archivo actualizado")
  }

  getProducts = async () =>{
    const usuarios = await fs.promises.readFile(this.ruta, "utf-8")
    if(usuarios.length === 0){
      return fs.promises.writeFile(this.ruta, "[]")
    }else{
      return JSON.parse(usuarios)
    }
  }

  getProductById = async (id) =>{
  const productos = await fs.promises.readFile(this.ruta, "utf-8")
    const productosString = JSON.parse(productos)
    const filterId = productosString.filter((prod)=> (prod.id == id))
    return filterId
  }

  updateProduct = async (id, campo, value) =>{
    const productos = await fs.promises.readFile(this.ruta, "utf-8")
    const productosString = JSON.parse(productos)
    const filterId = productosString.filter((prod)=> (prod.id == id))
    const filterOtherId = productosString.filter((prod)=> (prod.id !== id))
    
    filterId.map((elemento)=> (elemento[campo]= value))

    const cadenaProductos = [...filterOtherId, ...filterId]
    
    const cadenaArchivos = JSON.stringify(cadenaProductos)
    console.log(cadenaArchivos)
    await fs.promises.writeFile(this.ruta, cadenaArchivos)
    console.log("Producto editado") 

  }

  deleteProduct = async (id) =>{
    const productos = await fs.promises.readFile(this.ruta, "utf-8")
    const productosString = JSON.parse(productos)
    const filterId = productosString.filter((prod)=> (prod.id === id))

    if (filterId.length > 0){
    const filterIdDelete = productosString.filter((prod)=> (prod.id !== id))
      const cadenaArchivo = JSON.stringify(filterIdDelete)
      await fs.promises.writeFile(this.ruta, cadenaArchivo)
      console.log("Producto borrado") 
    }else{
      console.log("No existe un producto con ese Id")
    }
  }
}

const manager = new ProductManager("./producto.json")


/* manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.addProduct("producto 2","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.addProduct("producto 3","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.getProducts().then((productos)=> {console.log(productos)})  */

/* manager.getProductById(3).then((productos)=> {console.log(productos)})   */

/* manager.updateProduct(2, "price", 500) 
manager.getProducts().then((productos)=> {console.log(productos)}) */ 

/* manager.deleteProduct(1)
manager.getProducts().then((productos)=> {console.log(productos)}) */
