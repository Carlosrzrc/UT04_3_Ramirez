import { StoreHouse } from '../StoreHouse.js';
import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
    AlreadyExist,
    DontExist
} from '../Exceptions.js';
import { Product, Ropa, Joyas, Instrumento } from '../Product.js';
import { Coords } from '../Coords.js';
import { Store } from '../Store.js';
import { Category } from '../Category.js';
class StoreHouseController {
    //Campos provados
    #modelStoreHouse;
    #viewStoreHouse;

    #loadObjects() {
        //CATEGORIES
        let category1 = new Category('Abrigos');
        let category2 = new Category('Anillos');
        let category3 = new Category('Cuerda');
        let category4 = new Category('Pantalones');
        //ALMACEN
        let almacen = this.#modelStoreHouse
        //TIENDAS
        let store1 = new Store(2, "Pull And Bear");
        let store2 = new Store(3, "Zara");
        let store3 = new Store(4, "Imaginarium");
        let store4 = new Store(5, "HyM");
        //PRODUCTOS
        let product1 = new Product(1, "Citroen C5", "Coche", 5000);
        let product11 = new Product(11, "Audi A5", "Coche", 8000);
        let product12 = new Product(12, "Mercedes B5", "Coche", 15000);
        let product2 = new Ropa(2, "Air coat", "Abrigo tipo air", 80, 21, [], "algodon", "S", "Nike");
        let product3 = new Ropa(3, "Earth coat", "Abrigo tipo earth", 80, 21, [], "algodon", "M", "Nike");
        let product4 = new Ropa(4, "Water coat", "Abrigo tipo water", 80, 21, [], "algodon", "XL", "Nike");
        let product5 = new Joyas(5, "Cielo", "Anillo cielo", 1000, 21, [], "zafiro", "S", "swarowski", "anillo");
        let product6 = new Joyas(6, "Macarena", "Anillo esperanza", 1000, 21, [], "esmeralda", "M", "swarowski", "anillo");
        let product7 = new Joyas(7, "Mar", "Anillo mar", 1000, 21, [], "zafiro", "S", "swarowski", "anillo");
        let product8 = new Instrumento(8, "Guitarra", "Guitarra española", 150, 21, [], "cuerda", "marron");
        let product9 = new Instrumento(9, "Tambor", "Tambor español", 70, 21, [], "percusion", "blanco");
        let product10 = new Instrumento(10, "Flauta", "Flauta española", 30, 21, [], "viento", "verde");

        almacen.addCategory(category1);
        almacen.addCategory(category2);
        almacen.addCategory(category3);
        almacen.addCategory(category4);

        almacen.addStore(store1);
        almacen.addStore(store2);
        almacen.addStore(store3);
        almacen.addStore(store4);

        almacen.addProduct(product1, category1);
        almacen.addProduct(product2, category1);
        almacen.addProduct(product3, category1);
        almacen.addProduct(product4, category1);
        almacen.addProduct(product5, category2);
        almacen.addProduct(product6, category2);
        almacen.addProduct(product7, category2);
        almacen.addProduct(product8, category3);
        almacen.addProduct(product9, category3);
        almacen.addProduct(product10, category3);
        almacen.addProduct(product11, category3);
        almacen.addProduct(product12, category4);

        almacen.addProductInStore(product8, store3, 3);
        almacen.addProductInStore(product9, store3, 3);
        almacen.addProductInStore(product10, store3, 3);
        almacen.addProductInStore(product3, store2, 3);
        almacen.addProductInStore(product6, store1, 3);
        almacen.addProductInStore(product12, store4, 3);
    }

    constructor(modelStoreHouse, viewStoreHouse) {
        console.log("Manager Controller");
        this.#modelStoreHouse = modelStoreHouse;
        this.#viewStoreHouse = viewStoreHouse;

        this.onLoad();
        this.onInit();

    }

    onLoad = () => {
        this.#loadObjects();
    }

    onInit = () => {
        this.#viewStoreHouse.init(this.#modelStoreHouse);
    }

}

export { StoreHouseController };