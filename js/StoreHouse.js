
let StoreHouse = (function () { //La función anónima devuelve un método getInstance que permite obtener el objeto único
    let instantiated; //Objeto con la instancia única ShoppingCart

    function init(name) { //Inicialización del Singleton

        class StoreHouse {
            //Definición de atributos privados del objeto
            #name;
            #stores = [{
                store: new Store(1, "Generic", "Ciudad Real", 666777888, new Coords("10", "10")),
                products: []
            }]; //array stores
            #categories = [new Category("Default", "Categoria por defecto")]; //array categories
            constructor(name) {
                //La función se invoca con el operador new
                if (!new.target) throw new InvalidAccessConstructorException();
                if (!name) throw new EmptyValueException("name");
                //Asignación
                this.#name = name;
            }

            get name() {
                return this.#name;
            }

            set name(value) {
                if (!value) throw new EmptyValueException("name");
                this.#name = value;
            }

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

            get stores() {
                let nextIndex = 0;
                let array = this.#stores;
                return {
                    *[Symbol.iterator]() {
                        for (let elem of array.products) {
                            yield product;
                        }
                    }
                }
            }

            addCategory(category) {
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!category) throw new EmptyValueException("category");
                this.#categories.forEach(function (elem) {
                    if (category.title === elem.title) {
                        throw new "La categoria ya existe";
                    }
                });
                this.#categories.push(category);
                return this.#categories.length;
            }

            removeCategory(category) {
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!category) throw new EmptyValueException("category");
                let pos = this.#categories.findIndex(elem => elem.title == category.title)
                this.#stores.forEach(function (elem) {
                    for (const x of elem.products) {
                        for (const z of x.categories) {
                            if (z === elem.store.title) {
                                z = "Default";
                            }
                        }
                    }
                });
                this.#categories.splice(pos, 1);

            }

            addProduct(product, category) {
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);
                if (!(category instanceof Category)) throw new InvalidValueException("category", category);
                if (!product) throw new EmptyValueException();
                let store = this.#stores.find(elem => elem.CIF = 1)
                store.products.push({
                    product: product,
                    categories: [category.title]
                })
                return store.products.length;
            }

            removeProduct(product) {
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);


            }

            addProductInStore(product, store, number) {
                if (!(product instanceof Product)) throw new InvalidValueException("product", product);
                if (!(store instanceof Store)) throw new InvalidValueException("store", store);
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