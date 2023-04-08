//Resolucion DESAFIO

class ProductManager{
  static ultimo_id = 0
  constructor(){
    this.products = []
  }
  getProducts(){
    console.log(this.products)
  }
  addProduct(title, description,price,thumbnail,code,stock){
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
    if(this.products.length>0){
    this.products.map((prod)=>(
      prod.code === producto_nuevo.code
      ? console.log("Error, no puede introducir un producto con el mismo code")
      : this.products.push(producto_nuevo)
    ))
    }else{
      this.products.push(producto_nuevo)
    }
  }
  getProductById(id){
    const filterId = this.products.filter((prod)=> (prod.id == id)) 
    filterId.length === 0 ? console.log("Error, no hay ningun producto con esa Id") : console.log(filterId)
    
  }
}

const manager = new ProductManager()
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc123",25)
manager.addProduct("producto prueba","Este es un producto prueba",200,"Sin imagen","abc1233",25)
manager.getProducts()


manager.getProductById(3)