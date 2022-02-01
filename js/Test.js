"use strict";
function testCategory() {
    console.log("-------------------------------")
    console.log("TEST CATEGORY");
    console.log("-------------------------------")
    let category1 = new Category("Ropa");
    console.log("El nombre de la categoria es: " + category1.title);//ropa
    category1.title = "Tejidos";
    console.log("El nombre de la categoria cambiado es: " + category1.title);//tejidos
    console.log("La descripcion de la categoria es: " + category1.description);//No hya datos
    category1.description = "Categoria de tejidos"
    console.log("La descripcion de la categoria cambiada es: " + category1.description);//cat de tejidos
    console.log("EXCEPCIONES");
    let categoryWrong = new Category("Prueba");
    try {
        let category = Category("Constructor");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let category = new Category("");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        categoryWrong.title = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        categoryWrong.description = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
}

function testStore() {
    console.log("-------------------------------")
    console.log("TEST STORE");
    console.log("-------------------------------")
    let store1 = new Store(2,"Pull and Bear");
    console.log("El CIF de la tienda es: " + store1.CIF);//2
    console.log("El nombre de la tienda es: " + store1.name);//Pull and bear
    store1.name = "Pull and Shark";
    console.log("El nombre de la tienda modificada es: " + store1.name);//Pull and bear
    console.log("La direccion de la tienda es: " + store1.address);//N/S
    store1.address = "Ciudad Real";
    console.log("La direccion de la tienda cambiada es: " + store1.address);//CIUDAD REAL
    console.log("El tlf de la tienda es: " + store1.phone);//N/S
    store1.phone = "926926926";
    console.log("El tlf de la tienda cambiado es: " + store1.phone);//926926926
    console.log("Las coordenadas de la tienda son: " + store1.coords);
    store1.coords = new Coords("1","1");
    console.log("Las coordenadas de la tienda modificadas son: " + store1.coords);
    console.log("EXCEPCIONES");
    let storeWrong = new Store(1,"Prueba");
    try {
        let store = Store(1,"Constructor");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let store = new Store("","Prueba");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let store = new Store(1,"");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storeWrong.name = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storeWrong.address = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storeWrong.phone = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storeWrong.coords = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
}

function testCoords(){
    console.log("-------------------------------")
    console.log("TEST COORDS");
    console.log("-------------------------------")
    let coords1 = new Coords("2","2");
    console.log("La latitud es: " + coords1.latitude);//2
    coords1.latitude = "15";
    console.log("La latitud modificada es: " + coords1.latitude);//15
    console.log("La longitud es: " + coords1.longitude);//2
    coords1.longitude = "15";
    console.log("La longitud modificada es: " + coords1.latitude);//15
    console.log("EXCEPCIONES");
    let coordsWrong = new Coords("2","2");
    try {
        let coords = Coords("3","3");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let coords = new Coords("","3");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let coords = new Coords("3","");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        coordsWrong.latitude = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        coordsWrong.longitude = "";
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
}

function testProduct(){
    console.log("-------------------------------")
    console.log("TEST PRODUCTS");
    console.log("-------------------------------")
    let product1 = new Product(1,"Mesa","",25);
    console.log("El serial Number es: " + product1.serialNumber);//1
    console.log("El nombre es: " + product1.name);//mesa
    product1.name = "Mesa Sueca";
    console.log("El nombre modificado es: " + product1.name);//mesa sueca
    console.log("Descripcion: " + product1.description);//""
    product1.description = "Mesa Sueca R20";
    console.log("Descripcion modificada: " + product1.description);//mesa sueca r20
    console.log("Precio: " + product1.price);//25
    product1.price = "300";
    console.log("Precio modificado: " + product1.price);//300
    console.log("Tasa de impuestos: " + product1.tax);//21
    console.log("Imagenes: " + product1.images);//""
    product1.images = [1,2,3];
    console.log("Imagenes modificadas: " + product1.images);//1,2,3
    let ropa1 = new Ropa(2,"Abrigo","Invierno",200,"","","Algodon","S","Nike");
    console.log(ropa1.toString());
    let joya1 = new Joyas(3,"Verdel","",5000,"","","Esmeralda","S","Swarowsky","Anillo");
    console.log(joya1.toString());
    console.log("EXCEPCIONES");
    let productWrong = new Product(1,"Prueba","Hola",25);
    try {
        let product = Product(1,"Prueba","Hola",25);
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let product = new Product("","Prueba","Hola",25);
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let product = new Product(1,"","Hola",25);
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        let product = new Product(1,"Prueba","Hola","");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }

}

function testStoreHouse(){
    console.log("-------------------------------")
    console.log("TEST STOREHOUSE");
    console.log("-------------------------------")
    let storehouseFirst = StoreHouse.getInstance("INDITEX");//Creamos la instancia
    let storehouse1 = StoreHouse.getInstance("INDITEX");//Vemos que la instancia es igual
    console.log("Nombre del almacen: " + storehouse1.name)//inditex
    storehouse1.name = "INDITEX AND BEAR";
    console.log("Nombre del almacen modificado: " + storehouse1.name)//inditex and bear

    //CATEGORIAS
    let category1 = new Category("Furbo");
    let category2 = new Category("Tenis");
    //PRODUCTS
    let product1 = new Product(1,"Nike","C",250,"");
    let product2 = new Product(2,"Adidas","C",600,"");
    let product3 = new Product(3,"Reebok","C",1900,"");
    //TIENDAS
    let store1 = new Store(2,"Torre");
    let store2 = new Store(3,"Calle");

    //AÑADIMOS CATEGORIAS
    console.log("Añadimos y mostramos categorias:")
    console.log("Número de categorias: " + storehouse1.addCategory(category1)); //Añadimos categoria
    console.log("Número de categorias: " + storehouse1.addCategory(category2)); //Añadimos categoria
    
    for (const elem of storehouse1.categories) {//Mostramos categorias
        console.log(elem);
    }
    //Añadimos un producto por categoria, que ira a la store por defecto
    console.log("Añadimos productos por categoria: ");
    console.log("Numero de productos: " + storehouse1.addProduct(product1,category1));
    console.log("Numero de productos: " + storehouse1.addProduct(product2,category2));
    for (const elem of storehouse1.stores) {//Mostramos la tienda y vemos que contiene el producto añadido
        let arr = elem.products;
        console.log("MOSTRAMOS PRODUCTOS Y CATEGORIAS POR TIENDA")
        for (const x of arr) {
            console.log(x.product);
            console.log(x.categories);//MOSTRAMOS LAS CATEGORIAS
            
        }
    }
    console.log("Borramos categoria FURBO y mostramos categorias")//BORRAMOS CATEGORIA
    console.log("Numero de categorias: "+ storehouse1.removeCategory(category1));//Borramos la categoria furbo
    for (const elem of storehouse1.categories) {//Vemos que ya no esta ne #categories
        console.log(elem);
    }
    for (const elem of storehouse1.stores) {//Mostramos la tienda y vemos que contiene el producto añadido
        let arr = elem.products;
        console.log("MOSTRAMOS PRODUCTOS Y CATEGORIAS POR TIENDA")
        for (const x of arr) {
            console.log(x.product);
            console.log(x.categories);//MOSTRAMOS LAS CATEGORIAS
            
        }
    }
    console.log("Filtramos por categoria: ")
    for (const elem of storehouse1.getCategoryProducts(category2,Product)) {
        console.log(elem);
    }
    console.log("Borramos producto SERIAL:1")
    console.log("Numero de productos: "+storehouse1.removeProduct(product1));
    for (const elem of storehouse1.stores) {//Mostramos la tienda y vemos que contiene el producto añadido
        let arr = elem.products;
        console.log("MOSTRAMOS PRODUCTOS Y CATEGORIAS POR TIENDA")
        for (const x of arr) {
            console.log(x.product);
            console.log(x.categories);//MOSTRAMOS LAS CATEGORIAS
            
        }
    }

    //Añadimos nuevas tiendas
    console.log("Añadimos tiendas: ")
    console.log("Numero de tiendas: " + storehouse1.addStore(store1));
    console.log("Numero de tiendas: " + storehouse1.addStore(store2));
    console.log("Añadimos productos a las tiendas");
    console.log("Numero de productos en la tienda: "+storehouse1.addProductInStore(product2,store1,2));
    console.log("Numero de productos en la tienda: "+storehouse1.addProductInStore(product2,store2,2));
    console.log("Numero de productos en la tienda: "+storehouse1.addProductInStore(product2,store2,2));
    //Vemos que hay una nueva store
    console.log("Tiendas despues de addStore y addProductInStore");
    for (const elem of storehouse1.stores) {
        console.log(elem);
    }
    console.log("Numero de tiendas: "  + storehouse1.removeStore(store1));
    console.log("Tiendas despues de removeStore");
    for (const elem of storehouse1.stores) {
        console.log(elem);
    }

    console.log("Añadimos stock: " + storehouse1.addQuantityProductInStore(product2,store2,6));//8
    console.log("Tiendas despues de addQuantityProductInStore");
    for (const elem of storehouse1.stores) {
        console.log(elem);
    }

    console.log("Mostramos todos los objetos que tiene una tienda")
    for (const elem of storehouse1.getStoreProducts(store2,Product)) {
        console.log(elem);
    }

    console.log("EXCEPCIONES");
    let storehouse = StoreHouse.getInstance("Prueba");
    let category = new Category("LoL");
    let product = new Product(1,"Balon","",25);
    try {
        storehouse.addCategory("");//ADDCATEGPRY
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    storehouse.addCategory(category);
    try {
        storehouse.addCategory(category);
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.removeCategory(new Category("Hola"));//REMOVECATEGORY
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addProduct("");//ADDPRODUCT
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addProduct(product,"");
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.removeProduct(product);//REMOVEPRODUCT
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addProductInStore(new Product(1,"Balon","",25),new Store(10,"Hola"),6);//ADDPRODUCTINSTORE
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addProductInStore(new Product(10,"Balon","",25),new Store(1,"Hola"),6);
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.getCategoryProducts("",Product);//GETCATEGORYPRODUCTS
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addStore("");//ADDSTORE
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.addStore(new Store(1,"Hola"));
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.removeStore(new Store(10,"Hola"));//REMOVESTORE
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    try {
        storehouse.getStoreProducts("",Product);//GETCATEGORYPRODUCTS
    } catch (e) {
        console.log(e.name + " " + e.message);
    }
    
    

}

testCategory();
testStore();
testCoords();
testProduct();
testStoreHouse();
