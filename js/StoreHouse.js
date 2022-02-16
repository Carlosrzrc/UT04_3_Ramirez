import {
    BaseException,
    InvalidAccessConstructorException,
    EmptyValueException,
    InvalidValueException,
    AbstractClassException,
    AlreadyExist,
    DontExist
} from './Exceptions.js';
import { Product, Ropa, Joyas, Instrumento } from './Product.js';
import {Coords} from './Coords.js';
import {Store} from './Store.js';
import {Category} from './Category.js';

let StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única ShoppingCart

    function init(name) { //Inicialización del Singleton

        class StoreHouse {
            //Definición de atributos privados del objeto
            #name;
            #stores = [{
                store: new Store(1, "Generic", "Ciudad Real", "666777888", new Coords("10", "10")),
                products: []
            }];//array stores
            #categories = [new Category("Default", "Categoria por defecto")]; //array categories
            constructor(name) {
                //La función se invoca con el operador new
                if (!new.target) throw new InvalidAccessConstructorException();
                if (!name) throw new EmptyValueException("name");
                //Asignación
                this.#name = name;
            }
            //Propiedades de acceso
            get name() {
                return this.#name;
            }

            set name(value) {
                if (!value) throw new EmptyValueException("name");
                this.#name = value;
            }
            //ITERADOR CATEGORIAS
            get categories() {
                let nextIndex = 0;
                let array = this.#categories;
                return {
                    *[Symbol.iterator]() {
                        for (let product of array) {
                            yield product;
                        }
                    }
                }
            }
            //ITERADOR STORES
            get stores() {
                let nextIndex = 0;
                let array = this.#stores;
                return {
                    *[Symbol.iterator]() {
                        for (let product of array) {
                            yield product;
                        }
                    }
                }
            }
            //AÑADIR CATEGORY
            addCategory(category) {
                //VALIDACION
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!category) throw new EmptyValueException("category");
                this.#categories.forEach(function (elem) {
                    if (category.title === elem.title) {
                        throw new AlreadyExist(category.title);
                    }
                });

                this.#categories.push(category);
                return this.#categories.length;
            }
            //BORRAR CATEGORY
            removeCategory(category) {
                //VALIDACION
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!category) throw new EmptyValueException("category");
                if (this.#categories.findIndex(elem => elem.title === category.title) == -1) {
                    throw new DontExist(category.title);
                }
                let pos = this.#categories.findIndex(elem => elem.title == category.title)//cogemos posicion de la categoria en el array categories
                for (const elem of this.#stores) {//recorremos #stores
                    for (const x of elem.products) {
                        for (let i = 0; i < x.categories.length; i++) {//hasta entrar en las categories del producto, y alli cambiamos todos los de esa categoria a la default antes de borrar
                            if (category.title == x.categories[i]) {
                                x.categories[i] = "Default";
                            }
                        }
                    }
                }
                this.#categories.splice(pos, 1);//borramos con la posicion
                return this.#categories.length;

            }
            //AÑADIR PRODUCTO
            addProduct(product, category) {
                //VALIDACION
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!product) throw new EmptyValueException();

                let store = this.#stores.find(elem => elem.store.CIF == 1)//cogemos la tienda por defecto
                store.products.push({//añadimos los datos
                    product: product,
                    categories: [category.title],
                    stock: 1
                })
                return store.products.length;
            }
            //BORRAR PRODUCTO
            removeProduct(product) {
                //VALIDACION
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);

                for (const elem of this.#stores) {//recorremos #stores
                    let pos = elem.products.findIndex(elem => elem.product.serialNumber == product.serialNumber);//buscamos la posicion del producto
                    if (pos != -1) {//si el producto esta en alguna tienda
                        elem.products.splice(pos, 1);//borramos el producto
                        return elem.products.length;
                    } else {
                        throw new DontExist(product.name); //si no lanzamos excepcion
                    }
                }
            }
            //AÑADIR UN PRODUCTO A UNA TIENDA
            addProductInStore(product, store, number) {
                //VALIDACION
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);
                if (!(store instanceof Store)) throw new InvalidValueException("store", store);
                if ((this.#stores.findIndex(elem => elem.store.CIF == store.CIF)) == -1) throw new DontExist(store.name);
                if ((this.#stores[0].products.findIndex(elem => elem.product.serialNumber == product.serialNumber)) == -1) throw new DontExist(product.name);

                for (const elem of this.#stores) {//recorremos #stores
                    if (elem.store.CIF == store.CIF) {//si la tienda coincide le añadimos los datos
                        elem.products.push({
                            product: product,
                            categories: ["Default"],
                            stock: number
                        })
                        return elem.products.length;
                    }
                }

            }
            //AÑADIR STOCK
            addQuantityProductInStore(product, store, number) {
                //VALIDACION
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);
                if (!(store instanceof Store)) throw new InvalidValueException("store", store);
                if ((this.#stores.findIndex(elem => elem.store.CIF == store.CIF)) == -1) throw new DontExist("store");
                if (number < 0) throw new "Numero negativo";

                let posStore = this.#stores.findIndex(elem => elem.store.CIF == store.CIF);//buscamos la posicion de la tienda
                let arrayP = this.#stores[posStore].products;//metemos en un array los productos de esa tienda
                let posProduct = arrayP.findIndex(elem => elem.product.serialNumber == product.serialNumber);//buscamos la posicion del producto
                arrayP[posProduct].stock += number;//y le añadimos el stock
                return arrayP[posProduct].stock;
            }
            //ITERADOR DE PRODUCTOS POR CATEGORIA
            getCategoryProducts(category, typeProduct) {
                //VALIDACION
                if (!category) throw new EmptyValueException("category");

                let nextIndex = 0;
                let array = []
                this.#stores.forEach(function (elem) { //recorremos #stores
                    elem.products.forEach(function (elem) { //recorremos los productos
                        if (elem.categories.includes(category.title)) {//si algun producto tiene la propiedas requerida
                            array.push(elem.product);//se añade al array que se va a iterar
                        }

                    })
                })
                return {
                    *[Symbol.iterator]() {
                        for (let product of array) {
                            yield product;
                        }
                    }
                }

            }
            //AÑADIR TIENDA
            addStore(store) {
                //VALIDACION
                if (!(store instanceof Store)) throw new InvalidValueException("store", store);
                if (!store) throw new EmptyValueException("store");
                if ((this.#stores.findIndex(elem => elem.store.CIF == store.CIF)) != -1) throw new AlreadyExist("store");

                this.#stores.push({ store: store, products: [] });
                return this.#stores.length;
            }
            //BORRAR TIENDA
            removeStore(store) {
                //VALIDACION
                if (!(store instanceof Store)) throw new InvalidValueException("store", store);
                if ((this.#stores.findIndex(elem => elem.store.CIF == store.CIF)) == -1) throw new DontExist("store");

                let pos = this.#stores.findIndex(elem => elem.store.CIF == store.CIF);//posicion de la tienda
                let change = this.#stores[pos].products;//metemos los productos de la tineda en un array
                if (change != "") {//si tiene datos
                    this.#stores[0].products.push(change[0]);//los metemos en la tienda por defecto antes de borrar
                }

                this.#stores.splice(pos, 1);//borramos
                return this.#stores.length;
            }
            //ITERADOR DE PRODUCTOS POR TIENDA
            getStoreProducts(store, typeProduct) {
                if (!store) throw new EmptyValueException("store");

                let nextIndex = 0;
                let array = []
                let pos = this.#stores.findIndex(elem => elem.store.CIF == store.CIF);//posicion de la tienda
                this.#stores[pos].products.forEach(x => array.push({ product: x.product, stock: x.stock }))//recorremos los productos de la tienda y los añadimos al array con su stock
                return {
                    *[Symbol.iterator]() {
                        for (let product of array) {
                            yield product;
                        }
                    }
                }
            }



        }

        let sc = new StoreHouse(name);//Devolvemos el objeto StoreHouse para que sea una instancia única.
        Object.freeze(sc);
        return sc;
    } //Fin inicialización del Singleton
    return {
        // Devuelve un objeto con el método getInstance
        getInstance: function (name) {
            if (!instantiated) { //Si la variable instantiated es undefined, priemera ejecución, ejecuta init.
                instantiated = init(name); //instantiated contiene el objeto único
            }
            return instantiated; //Si ya está asignado devuelve la asignación.
        }
    };
})();

export {StoreHouse};