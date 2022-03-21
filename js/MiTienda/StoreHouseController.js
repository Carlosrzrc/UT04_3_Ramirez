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
import { getCookie } from '../validation.js';
class StoreHouseController {
    //Campos provados
    #modelStoreHouse;
    #viewStoreHouse;
    #backup = {
        datos: [],
    };

    #loadObjects() {
        let back = this.#backup;
        let almacen = this.#modelStoreHouse
        $.ajax({
            async: false,
            url: '../../objects.json',
            dataType: 'json',
            method: 'get',
            data: {},
            success: function (data) {
                back.datos.push(data);
                console.log(back);
                data.categories.forEach(category => {
                    let name = category.name;

                    let titulo = new Category(name);
                    almacen.addCategory(titulo);

                    switch (name) {
                        case "Coches":
                            data.products.forEach(product => {
                                let serialNumber = product.serialNumber;
                                let name = product.name;
                                let description = product.description;
                                let price = product.price;
                                let tax = product.tax;
                                let images = product.images;

                                let a = new Product(serialNumber, name, description, price, tax, images);
                                almacen.addProduct(a, titulo);
                            });
                            break;
                        case "Abrigos":
                            data.ropas.forEach(ropa => {
                                let serialNumber = ropa.serialNumber;
                                let name = ropa.name;
                                let description = ropa.description;
                                let price = ropa.price;
                                let tax = ropa.tax;
                                let images = ropa.images;
                                let tejido = ropa.tejido;
                                let talla = ropa.talla;
                                let marca = ropa.marca;

                                let a = new Ropa(serialNumber, name, description, price, tax, images, tejido, talla, marca);
                                almacen.addProduct(a, titulo);
                            });
                            break;
                        case "Anillos":
                            data.joyas.forEach(joya => {
                                let serialNumber = joya.serialNumber;
                                let name = joya.name;
                                let description = joya.description;
                                let price = joya.price;
                                let tax = joya.tax;
                                let images = joya.images;
                                let material = joya.material;
                                let talla = joya.talla;
                                let marca = joya.marca;
                                let tipo = joya.tipo;

                                let a = new Joyas(serialNumber, name, description, price, tax, images, material, talla, marca, tipo);
                                almacen.addProduct(a, titulo);
                            });
                            break;
                        case "Musica":
                            data.instrumentos.forEach(instrumento => {
                                let serialNumber = instrumento.serialNumber;
                                let name = instrumento.name;
                                let description = instrumento.description;
                                let price = instrumento.price;
                                let tax = instrumento.tax;
                                let images = instrumento.images;
                                let tipo = instrumento.tipo;
                                let color = instrumento.color;

                                let a = new Instrumento(serialNumber, name, description, price, tax, images, tipo, color);
                                almacen.addProduct(a, titulo);
                            });
                            break;
                    }
                });

                data.stores.forEach(store => {
                    let CIF = store.CIF;
                    let name = store.name;
                    let titulo = new Store(CIF, name);
                    almacen.addStore(titulo);

                    switch (name) {
                        case "Zara":
                            data.instrumentos.forEach(instrumento => {
                                let serialNumber = instrumento.serialNumber;
                                let name = instrumento.name;
                                let description = instrumento.description;
                                let price = instrumento.price;
                                let tax = instrumento.tax;
                                let images = instrumento.images;
                                let tipo = instrumento.tipo;
                                let color = instrumento.color;

                                let a = new Instrumento(serialNumber, name, description, price, tax, images, tipo, color);
                                almacen.addProductInStore(a, titulo, 3);
                            });
                            break;
                        case "Pull And Bear":
                            data.joyas.forEach(joya => {
                                let serialNumber = joya.serialNumber;
                                let name = joya.name;
                                let description = joya.description;
                                let price = joya.price;
                                let tax = joya.tax;
                                let images = joya.images;
                                let material = joya.material;
                                let talla = joya.talla;
                                let marca = joya.marca;
                                let tipo = joya.tipo;

                                let a = new Joyas(serialNumber, name, description, price, tax, images, material, talla, marca, tipo);
                                almacen.addProductInStore(a, titulo, 5);
                            });
                            let serialNumber = data.products[0].serialNumber;
                            let name = data.products[0].name;
                            let description = data.products[0].description;
                            let price = data.products[0].price;
                            let tax = data.products[0].tax;
                            let images = data.products[0].images;
                            let a = new Product(serialNumber, name, description, price, tax, images);
                            almacen.addProductInStore(a, titulo, 3);
                            break;
                        case "HyM":
                            data.ropas.forEach(ropa => {
                                let serialNumber = ropa.serialNumber;
                                let name = ropa.name;
                                let description = ropa.description;
                                let price = ropa.price;
                                let tax = ropa.tax;
                                let images = ropa.images;
                                let tejido = ropa.tejido;
                                let talla = ropa.talla;
                                let marca = ropa.marca;

                                let a = new Ropa(serialNumber, name, description, price, tax, images, tejido, talla, marca);
                                almacen.addProductInStore(a, titulo, 5);
                            });
                            break;
                        case "Imaginarium":
                            let serialNumber2 = data.products[2].serialNumber;
                            let name2 = data.products[2].name;
                            let description2 = data.products[2].description;
                            let price2 = data.products[2].price;
                            let tax2 = data.products[2].tax;
                            let images2 = data.products[2].images;
                            let a2 = new Product(serialNumber2, name2, description2, price2, tax2, images2);
                            almacen.addProductInStore(a2, titulo, 3);
                    }
                });


            }

        });

        //CATEGORIES
        // let category1 = new Category('Abrigos');
        // let category2 = new Category('Anillos');
        // let category3 = new Category('Música');
        // let category4 = new Category('Coches');
        //ALMACEN
        //TIENDAS
        // let store1 = new Store(2, "Pull And Bear");
        // let store2 = new Store(3, "Zara");
        // let store3 = new Store(4, "Imaginarium");
        // let store4 = new Store(5, "HyM");
        //PRODUCTOS
        // let product1 = new Product(1, "Citroen C5", "Coche berlina", 5000, 21, "../../img/c5.jpg");
        // let product11 = new Product(11, "Audi A5", "Coche deportivo", 8000, 21, "../../img/a5.jpg");
        // let product12 = new Product(12, "Mercedes B5", "Coche lujo", 15000, 21, "../../img/mercedes.webp");
        // let product2 = new Ropa(2, "Air coat", "Abrigo tipo air", 80, 21, "../../img/air.jpeg", "algodon", "S", "Nike");
        // let product3 = new Ropa(3, "Earth coat", "Abrigo tipo earth", 80, 21, "../../img/earthcoat.jpg", "algodon", "M", "Nike");
        // let product4 = new Ropa(4, "Water coat", "Abrigo tipo water", 80, 21, "../../img/watercoat.jpg", "algodon", "XL", "Nike");
        // let product5 = new Joyas(5, "Cielo", "Anillo cielo", 1000, 21, "../../img/diamante.jpg", "zafiro", "S", "swarowski", "anillo");
        // let product6 = new Joyas(6, "Macarena", "Anillo esperanza", 1000, 21, "../../img/macarena.jpg", "esmeralda", "M", "swarowski", "anillo");
        // let product7 = new Joyas(7, "Mar", "Anillo mar", 1000, 21, "../../img/zafiro.jpg", "zafiro", "S", "swarowski", "anillo");
        // let product8 = new Instrumento(8, "Guitarra", "Guitarra española", 150, 21, "../../img/guitarra.jpg", "cuerda", "marron");
        // let product9 = new Instrumento(9, "Tambor", "Tambor español", 70, 21, "../../img/tambor.jpg", "percusion", "blanco");
        // let product10 = new Instrumento(10, "Flauta", "Flauta española", 30, 21, "../../img/flauta.jpg", "viento", "verde");

        // almacen.addCategory(category1);
        // almacen.addCategory(category2);
        // almacen.addCategory(category3);
        // almacen.addCategory(category4);

        // almacen.addStore(store1);
        // almacen.addStore(store2);
        // almacen.addStore(store3);
        // almacen.addStore(store4);

        // almacen.addProduct(product1, category4);
        // almacen.addProduct(product2, category1);
        // almacen.addProduct(product3, category1);
        // almacen.addProduct(product4, category1);
        // almacen.addProduct(product5, category2);
        // almacen.addProduct(product6, category2);
        // almacen.addProduct(product7, category2);
        // almacen.addProduct(product8, category3);
        // almacen.addProduct(product9, category3);
        // almacen.addProduct(product10, category3);
        // almacen.addProduct(product11, category4);
        // almacen.addProduct(product12, category4);

        // almacen.addProductInStore(product8, store3, 3);
        // almacen.addProductInStore(product9, store3, 3);
        // almacen.addProductInStore(product10, store3, 3);
        // almacen.addProductInStore(product3, store2, 3);
        // almacen.addProductInStore(product6, store1, 3);
        // almacen.addProductInStore(product2, store1, 5);
        // almacen.addProductInStore(product12, store4, 6);
        // almacen.addProductInStore(product7, store4, 6);
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
        this.#viewStoreHouse.bindShowLogin(this.handleShowLogin);
        this.#viewStoreHouse.bindDeleteCookie(this.handleDeleteCookie);


    }

    onLoad = () => {
        this.#loadObjects();

    }

    onInit = () => {
        this.#viewStoreHouse.init(this.#modelStoreHouse.stores);
        this.#viewStoreHouse.showCategoriesInMenu(this.#modelStoreHouse.categories);
        this.#viewStoreHouse.showStoresInMenu(this.#modelStoreHouse.stores);
        this.#viewStoreHouse.checkCookie();
        if (getCookie('Nombre') == 'admin') {
            this.#viewStoreHouse.showMenu();
            this.#viewStoreHouse.bindFormAddCategory(this.handleNewCategoryForm, this.handleRemoveCategoryForm, this.handleNewStoreForm,
                this.handleRemoveStoreForm, this.handleRemoveProductForm);
            this.#viewStoreHouse.bindBackUp(this.handleBackUp);
        }
    }

    handleInit = () => {
        this.onInit();
    }

    //MUESTRA DATOS MODELO

    handleProductsStore = (store, isMainEmpty) => {
        this.#viewStoreHouse.showProductsStore(this.#modelStoreHouse.getStoreProducts(new Store(store, "nueva")), isMainEmpty);
    }

    handleProduct = (product) => {
        this.#viewStoreHouse.showProduct(this.#modelStoreHouse.getProduct(product));

    }

    handleCategory = (category) => {
        this.#viewStoreHouse.showProductsCategories(this.#modelStoreHouse.getCategoryProducts(new Category(category)));
    }

    //VENTANAS

    handleShowProductInNewWindow = (product) => {
        this.#viewStoreHouse.showProductInNewWindow(this.#modelStoreHouse.getProduct(product));
    }

    handleCloseWindow = () => {
        this.#viewStoreHouse.closeWindows();
    }

    //FORMULARIOS

    handleNewCategoryForm = () => {
        this.#viewStoreHouse.ShowNewCategoryForm();
        this.#viewStoreHouse.bindNewCategoryForm(this.handleCreateCategory);
    }

    handleCreateCategory = (title, desc) => {
        let cat = new Category(title, desc);
        let gen = {
            name: title,
            description: desc
        };
        this.#backup.datos.push(gen);
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
            let gen = {
                name: cat.title,
                description: cat.description
            };
            this.#backup.datos.push(gen);
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
        let store = new Store(CIF, name, addres, tlf, new Coords(arrCord[0], arrCord[1]));
        let done, error;
        try {
            this.#modelStoreHouse.addStore(store);
            let gen = {
                CIF: CIF,
                name: name,
                addres: addres,
                tlf: tlf,
                coords: coords
            };
            this.#backup.datos.push(gen);
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
                if (i.CIF == CIF) {
                    store = i;
                }
            }
            this.#modelStoreHouse.removeStore(store);
            let gen = {
                CIF: CIF,
                name: store.name,
                addres: store.address,
                tlf: store.tlf,
                coords: store.coords
            };
            this.#backup.datos.push(gen);
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
        let done, error, product;
        try {
            for (let i of this.#modelStoreHouse.products) {
                if (i.serialNumber == serialNumber) {
                    product = i;
                }
            }
            this.#modelStoreHouse.removeProduct(product);
            let clase = product.__proto__.constructor.name;
            switch (clase) {
                case "Product":
                    let gen = {
                        serialNumber: serialNumber,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        tax: product.tax,
                        images: product.images
                    };
                    this.#backup.datos.push(gen);
                    break;
                case "Ropa":
                    let gen2 = {
                        serialNumber: serialNumber,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        tax: product.tax,
                        images: product.images,
                        tejido: product.tejido,
                        talla: product.talla,
                        marca: product.marca
                    };
                    this.#backup.datos.push(gen2);
                    break;
                case "Joyas":
                    let gen3 = {
                        serialNumber: serialNumber,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        tax: product.tax,
                        images: product.images,
                        material: product.material,
                        talla: product.talla,
                        marca: product.marca,
                        tipo: product.tipo
                    };
                    this.#backup.datos.push(gen3);
                    break;
                case "Instrumento":
                case "Ropa":
                    let gen4 = {
                        serialNumber: serialNumber,
                        name: product.name,
                        description: product.description,
                        price: product.price,
                        tax: product.tax,
                        images: product.images,
                        tipo: product.tipo,
                        color: product.color
                    };
                    this.#backup.datos.push(gen4);
            }
            console.log(this.#backup);
            done = true;
        } catch (exception) {
            done = false;
            error = exception;
        }
        this.#viewStoreHouse.showRemoveProductModal(done, product, position, error);
        this.#viewStoreHouse.showRemoveProductForm(this.#modelStoreHouse.products);
        this.#viewStoreHouse.bindRemoveProductForm(this.handleRemoveProduct);

    }

    //Form login

    handleShowLogin = () => {
        this.#viewStoreHouse.showLogin();
        this.#viewStoreHouse.bindLoginForm(this.handleAutenticacion);
    }

    handleAutenticacion = (nombre, pass) => {
        if (nombre == "admin" && pass == "admin") {
            this.#viewStoreHouse.createCookies(nombre, pass);
            this.#viewStoreHouse.checkCookie();
            this.onInit();
            location.reload();
        } else {
            this.#viewStoreHouse.showModalLoginError();
        }

    }

    handleDeleteCookie = () => {
        this.#viewStoreHouse.deleteCookie();
        location.reload();
    }

    //BACKUP
    handleBackUp = () => {
        this.#viewStoreHouse.createBackUp();
        let exportar = JSON.stringify(this.#backup);
        console.log(exportar);
        //INTENTO CREACION FICHERO
        let time = Date.now();
        let fecha = new Date(time);
        fecha = fecha.toISOString();
        var file = new File(
            [exportar],
            fecha + ".json",
            { type: 'application/json' }
        )

        saveAs(file);

    }

}

export { StoreHouseController };