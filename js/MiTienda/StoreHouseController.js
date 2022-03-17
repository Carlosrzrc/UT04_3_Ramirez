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
        let category3 = new Category('Música');
        let category4 = new Category('Coches');
        //ALMACEN
        let almacen = this.#modelStoreHouse
        //TIENDAS
        let store1 = new Store(2, "Pull And Bear");
        let store2 = new Store(3, "Zara");
        let store3 = new Store(4, "Imaginarium");
        let store4 = new Store(5, "HyM");
        //PRODUCTOS
        let product1 = new Product(1, "Citroen C5", "Coche berlina", 5000, 21, "../../img/c5.jpg");
        let product11 = new Product(11, "Audi A5", "Coche deportivo", 8000, 21, "../../img/a5.jpg");
        let product12 = new Product(12, "Mercedes B5", "Coche lujo", 15000, 21, "../../img/mercedes.webp");
        let product2 = new Ropa(2, "Air coat", "Abrigo tipo air", 80, 21, "../../img/air.jpeg", "algodon", "S", "Nike");
        let product3 = new Ropa(3, "Earth coat", "Abrigo tipo earth", 80, 21, "../../img/earthcoat.jpg", "algodon", "M", "Nike");
        let product4 = new Ropa(4, "Water coat", "Abrigo tipo water", 80, 21, "../../img/watercoat.jpg", "algodon", "XL", "Nike");
        let product5 = new Joyas(5, "Cielo", "Anillo cielo", 1000, 21, "../../img/diamante.jpg", "zafiro", "S", "swarowski", "anillo");
        let product6 = new Joyas(6, "Macarena", "Anillo esperanza", 1000, 21, "../../img/macarena.jpg", "esmeralda", "M", "swarowski", "anillo");
        let product7 = new Joyas(7, "Mar", "Anillo mar", 1000, 21, "../../img/zafiro.jpg", "zafiro", "S", "swarowski", "anillo");
        let product8 = new Instrumento(8, "Guitarra", "Guitarra española", 150, 21, "../../img/guitarra.jpg", "cuerda", "marron");
        let product9 = new Instrumento(9, "Tambor", "Tambor español", 70, 21, "../../img/tambor.jpg", "percusion", "blanco");
        let product10 = new Instrumento(10, "Flauta", "Flauta española", 30, 21, "../../img/flauta.jpg", "viento", "verde");

        almacen.addCategory(category1);
        almacen.addCategory(category2);
        almacen.addCategory(category3);
        almacen.addCategory(category4);

        almacen.addStore(store1);
        almacen.addStore(store2);
        almacen.addStore(store3);
        almacen.addStore(store4);

        almacen.addProduct(product1, category4);
        almacen.addProduct(product2, category1);
        almacen.addProduct(product3, category1);
        almacen.addProduct(product4, category1);
        almacen.addProduct(product5, category2);
        almacen.addProduct(product6, category2);
        almacen.addProduct(product7, category2);
        almacen.addProduct(product8, category3);
        almacen.addProduct(product9, category3);
        almacen.addProduct(product10, category3);
        almacen.addProduct(product11, category4);
        almacen.addProduct(product12, category4);

        almacen.addProductInStore(product8, store3, 3);
        almacen.addProductInStore(product9, store3, 3);
        almacen.addProductInStore(product10, store3, 3);
        almacen.addProductInStore(product3, store2, 3);
        almacen.addProductInStore(product6, store1, 3);
        almacen.addProductInStore(product2, store1, 5);
        almacen.addProductInStore(product12, store4, 6);
        almacen.addProductInStore(product7, store4, 6);
    }

    constructor(modelStoreHouse, viewStoreHouse) {
        console.log("Manager Controller");
        this.#modelStoreHouse = modelStoreHouse;
        this.#viewStoreHouse = viewStoreHouse;

        this.onLoad();
        this.onInit();

        this.#viewStoreHouse.bindInit(this.handleInit)
        this.#viewStoreHouse.bindProductsCategoryList(this.handleProductsStore);
        this.#viewStoreHouse.bindProduct(this.handleProduct);
        this.#viewStoreHouse.bindProductCategory(this.handleCategory);
        this.#viewStoreHouse.bindShowNewWindow(this.handleShowProductInNewWindow);
        this.#viewStoreHouse.bindClose(this.handleCloseWindow);

    }

    onLoad = () => {
        this.#loadObjects();
        this.#viewStoreHouse.showMenu();
        this.#viewStoreHouse.bindFormAddCategory(this.handleNewCategoryForm, this.handleRemoveCategoryForm, this.handleNewStoreForm, this.handleRemoveStoreForm, this.handleRemoveProductForm);
    }

    onInit = () => {
        this.#viewStoreHouse.init(this.#modelStoreHouse.stores);
        this.#viewStoreHouse.showCategoriesInMenu(this.#modelStoreHouse.categories);
        this.#viewStoreHouse.showStoresInMenu(this.#modelStoreHouse.stores);
    }

    handleInit = () => {
        this.onInit();
    }

    handleProductsStore = (store) => {
        this.#viewStoreHouse.showProductsStore(this.#modelStoreHouse.getStoreProducts(new Store(store, "nueva")));
    }

    handleProduct = (product) => {
        this.#viewStoreHouse.showProduct(this.#modelStoreHouse.getProduct(product));

    }

    handleCategory = (category) => {
        this.#viewStoreHouse.showProductsCategories(this.#modelStoreHouse.getCategoryProducts(new Category(category)));
    }

    handleShowProductInNewWindow = (product) => {
        this.#viewStoreHouse.showProductInNewWindow(this.#modelStoreHouse.getProduct(product));
    }

    handleCloseWindow = () => {
        this.#viewStoreHouse.closeWindows();
    }



    handleNewCategoryForm = () => {
        this.#viewStoreHouse.ShowNewCategoryForm();
        this.#viewStoreHouse.bindNewCategoryForm(this.handleCreateCategory);
    }

    handleCreateCategory = (title, desc) => {
        let cat = new Category(title, desc);
        cat.description = desc;
        let done, error;
        try {
            this.#modelStoreHouse.addCategory(cat);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewStoreHouse.showNewCategoryModal(done, cat, error);
        this.#viewStoreHouse.showCategoriesInMenu(this.#modelStoreHouse.categories); //Mostrar
    }



    handleRemoveCategoryForm = () => {
        this.#viewStoreHouse.showRemoveCategoryForm(this.#modelStoreHouse.categories);
        this.#viewStoreHouse.bindRemoveCategoryForm(this.handleRemoveCategory);
    }

    handleRemoveCategory = (title, position) => {
        let done, error, cat;
        try {
            cat = this.#modelStoreHouse.getCategory(title);
            this.#modelStoreHouse.removeCategory(cat);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewStoreHouse.showRemoveCategoryModal(done, cat, position, error);
        this.#viewStoreHouse.showRemoveCategoryForm(this.#modelStoreHouse.categories);
        this.#viewStoreHouse.bindRemoveCategoryForm(this.handleRemoveCategory);
        this.#viewStoreHouse.showCategoriesInMenu(this.#modelStoreHouse.categories);
    }

    handleNewStoreForm = () => {
        this.#viewStoreHouse.ShowNewStoreForm();
        this.#viewStoreHouse.bindNewStoreForm(this.handleCreateStore);
    }

    handleCreateStore = (CIF, name, addres, tlf, coords) => {
        let arrCord = coords.split("-");
        let store = new Store(CIF, name, addres, tlf, new Coords(arrCord[0],arrCord[1]));
        let done, error;
        try {
            this.#modelStoreHouse.addStore(store);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        console.log(done);
        this.#viewStoreHouse.showNewStoreModal(done, store, error);
        this.#viewStoreHouse.showStoresInMenu(this.#modelStoreHouse.stores); //Mostrar
    }

    handleRemoveStoreForm = () => {
        this.#viewStoreHouse.showRemoveStoreForm(this.#modelStoreHouse.stores);
        this.#viewStoreHouse.bindRemoveStoreForm(this.handleRemoveStore);
    }

    handleRemoveStore = (CIF, position) => {
        let done, error, store;
        try {
            for (let i of this.#modelStoreHouse.stores) {
                if (i.CIF == CIF){
                    store = i;
                }
            }
            this.#modelStoreHouse.removeStore(store);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewStoreHouse.showRemoveStoreModal(done, store, position, error);
        this.#viewStoreHouse.showRemoveStoreForm(this.#modelStoreHouse.stores);
        this.#viewStoreHouse.bindRemoveStoreForm(this.handleRemoveStore);
        this.#viewStoreHouse.showStoresInMenu(this.#modelStoreHouse.stores);

    }

    handleRemoveProductForm = () => {
        this.#viewStoreHouse.showRemoveProductForm(this.#modelStoreHouse.products);
        this.#viewStoreHouse.bindRemoveProductForm(this.handleRemoveProduct);
    }

    handleRemoveProduct = (serialNumber, position) => {
        console.log(serialNumber);
        let done, error, product;
        try {
            for (let i of this.#modelStoreHouse.products) {
                if (i.serialNumber == serialNumber){
                    product = i;
                }
            }
            this.#modelStoreHouse.removeProduct(product);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        console.log(done);
        this.#viewStoreHouse.showRemoveProductModal(done, product, position, error);
        this.#viewStoreHouse.showRemoveProductForm(this.#modelStoreHouse.products);
        this.#viewStoreHouse.bindRemoveProductForm(this.handleRemoveProduct);

    }
}

export { StoreHouseController };