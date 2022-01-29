
function testCategory() {
    console.log("-------------------------------")
    console.log("TEST CATEGORY");
    console.log("-------------------------------")
    let category1 = new Category("Ropa");
    console.log("El nombre de la categoria es: " + category1.title);
    category1.title = "Tejidos";
    console.log("El nombre de la categoria cambiado es: " + category1.title);
    console.log("La descripcion de la categoria es: " + category1.description);
    category1.description = "Categoria de tejidos"
    console.log("La descripcion de la categoria cambiada es: " + category1.description);

}

function testStore() {
    console.log("-------------------------------")
    console.log("TEST STORE");
    console.log("-------------------------------")
    let store1 = new Store(2,"Pull and Bear");
    console.log("El CIF de la tienda es: " + store1.CIF);
    console.log("El nombre de la tienda es: " + store1.name);
    store1.name = "Pull and Shark";
    console.log("La direccion de la tienda es: " + store1.address);
    store1.address = "Ciudad Real";
    console.log("La direccion de la tienda cambiada es: " + store1.address);
    console.log("El tlf de la tienda es: " + store1.phone);
    store1.phone = "926926926";
    console.log("El tlf de la tienda cambiado es: " + store1.phone);
    console.log("Las coordenadas de la tienda son: " + store1.coords);
    store1.coords = new Coords("1","1");
    console.log("Las coordenadas de la tienda modificadas son: " + store1.coords);
}

function testCoords(){
    console.log("-------------------------------")
    console.log("TEST COORDS");
    console.log("-------------------------------")
    let coords1 = new Coords("2","2");
    console.log("La latitud es: " + coords1.latitude);
    coords1.latitude = "15";
    console.log("La latitud modificada es: " + coords1.latitude);
    console.log("La longitud es: " + coords1.longitude);
    coords1.longitude = "15";
    console.log("La longitud modificada es: " + coords1.latitude);
}

function testProduct(){
    console.log("-------------------------------")
    console.log("TEST PRODUCTS");
    console.log("-------------------------------")
    let coords1 = new Coords("2","2");
    console.log("La latitud es: " + coords1.latitude);
    coords1.latitude = "15";
    console.log("La latitud modificada es: " + coords1.latitude);
    console.log("La longitud es: " + coords1.longitude);
    coords1.longitude = "15";
    console.log("La longitud modificada es: " + coords1.latitude);
}

function testStoreHouse(){
    console.log("-------------------------------")
    console.log("TEST STOREHOUSE");
    console.log("-------------------------------")
    let storehouse1 = StoreHouse.getInstance("INDITEX");
    console.log(storehouse1.categories);
    storehouse1.addCategory(new Category("Furbo"));
    storehouse1.removeCategory(new Category("Furbo"));
    for (const elem of storehouse1.categories) {
        console.log(elem);
    }

    storehouse1.addProduct(new Product(1,"Nike","C",250,""),new Category("Furbo"));
    console.log(storehouse1.stores);
    for (const elem of storehouse1.stores) {
        console.log(elem);
    }
}

testCategory();
testStore();
testCoords();
testStoreHouse();
