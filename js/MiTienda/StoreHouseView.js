import { StoreHouse } from "../StoreHouse.js";

class StoreHouseView {
    constructor() {
        this.main = $('main');
        this.section = $("section.product");
        this.ficha = $("section.ficha");
    }

    init(stores) {
        this.main.empty();
        let titulo = $(`<div><h1 class="text-center">TIENDAS</h1></div>`)
        let container = $(`<div id="container" class="d-flex justify-content-center flex-wrap m-5"></div>`);
        for (let store of stores) {
            container.append(`<div class="card text-center m-2 border border-primary" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${store.name}</h5>
            <p class="card-text">Mire los productos que tenemos para usted</p>
            <a href="#titulo" data-store="${store.CIF}" class="btn btn-primary">${store.name}</a>
            </div>
            </div>`
            )
        }
        this.main.append(titulo);
        this.main.append(container);
    }

    showCategoriesInMenu(categories) {
        let menu = $('#categorias');
        for (let category of categories) {
            menu.append(`<li><a data-category="${category.title}" class="dropdown-item" href="#titulo">${category.title}</a></li>
                `)
        }
    }

    showStoresInMenu(stores) {
        let menu = $('#stores');
        for (let store of stores) {
            menu.append(`<li><a data-store="${store.CIF}" class="dropdown-item" href="#titulo">${store.name}</a></li>
                `)
        }
    }

    showProductsStore(products) {
        this.section.empty();
        this.ficha.empty();
        let titulo = $(`<div id="titulo"><h1 class="text-center">PRODUCTOS</h1></div>`)
        let container = $(`<table class="table table-hover" id="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Información</th>
            <tbody id="tb">
            </tbody>
          </tr>
        </thead>      
        </table>`);
        this.section.append(titulo);
        this.section.append(container);
        let tb = $('#tb');
        for (let product of products) {
            tb.append(`               
              <tr>
                <th scope="row"></th>
                <td>${product.product.name}</td>
                <td>${product.product.description}</td>
                <td>${product.product.price}</td>
                <td><a href="#containerF" id="bt" data-product="${product.product.serialNumber}" class="btn btn-primary">${product.product.name}</a></td>
              </tr>
              `
            );
        }
    }

    showProduct(product) {
        this.ficha.empty();
        let container = $(`<div id="containerF" class="d-flex justify-content-center"></div>`);
        console.log(product.images);
        let clase = product.__proto__.constructor.name;
        switch (clase) {
            case "Ropa":
                container.append(`<div class="card border border-warning mt-5 mb-2 text-center width="100" style="width: 18rem;">
        <img src="${product.images}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title border border-primary">${product.name}</h5>
          <h6 class="card-text">${product.description}</h6>
          <h6 class="card-text">Precio: ${product.price}€</h6>
          <h6 class="card-text">Tejido: ${product.tejido}</h6>
          <h6 class="card-text">Talla: ${product.talla}</h6>
          <h6 class="card-text">Marca: ${product.marca}</h6>
        </div>
      </div>`)
                break;
            case "Product":
                container.append(`<div class="card border border-primary mt-5 mb-2 text-center width="100" style="width: 18rem;">
        <img src="${product.images}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title border border-primary">${product.name}</h5>
          <h6 class="card-text">${product.description}</h6>
          <h6 class="card-text">Precio: ${product.price}€</h6>
        </div>
      </div>`)
                break;
            case "Joyas":
                container.append(`<div class="card border border-success mt-5 mb-2 text-center width="100" style="width: 18rem;">
        <img src="${product.images}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title border border-primary">${product.name}</h5>
          <h6 class="card-text">${product.description}</h6>
          <h6 class="card-text">Precio: ${product.price}€</h6>
          <h6 class="card-text">Material: ${product.material}</h6>
          <h6 class="card-text">Talla: ${product.talla}</h6>
          <h6 class="card-text">Marca: ${product.marca}</h6>
          <h6 class="card-text">Tipo: ${product.tipo}</h6>
        </div>
      </div>`)
                break;
            case "Instrumento":
                container.append(`<div class="card border border-info mt-5 mb-2 text-center width="100" style="width: 18rem;">
        <img src="${product.images}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title border border-primary">${product.name}</h5>
          <h6 class="card-text">${product.description}</h6>
          <h6 class="card-text">Precio: ${product.price}</h6>
          <h6 class="card-text">Tipo: ${product.tipo}</h6>
          <h6 class="card-text">Color: ${product.color}</h6>
        </div>
      </div>`)
                break;
        }
        this.ficha.append(container);
    }

    showProductsCategories(products) {
        this.main.empty();
        this.section.empty();
        this.ficha.empty();
        let titulo = $(`<div id="titulo"><h1 class="text-center">PRODUCTOS</h1></div>`)
        let container = $(`<table class="table table-hover" id="table">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Descripcion</th>
            <th scope="col">Precio</th>
            <th scope="col">Información</th>
            <tbody id="tb">
            </tbody>
          </tr>
        </thead>      
        </table>`);
        this.section.append(titulo);
        this.section.append(container);
        let tb = $('#tb');
        for (let product of products) {
            console.log(product);
            tb.append(`               
              <tr>
                <th scope="row"></th>
                <td>${product.name}</td>
                <td>${product.description}</td>
                <td>${product.price}</td>
                <td><a href="#containerF" id="bt" data-product="${product.serialNumber}" class="btn btn-primary">${product.name}</a></td>
              </tr>
              `
            );
        }
    }


    bindInit(handler) {
        $('#init').click((event) => {
            handler();
        });
    }


    bindProductsCategoryList(handler) {
        $('main').find('a').click(function (event) {
            handler(this.dataset.store);
        });
        $('#stores').find('a').click(function (event) {
            handler(this.dataset.store);
        });
    }

    bindProduct(handler) {
        $(document).on('click', "#bt", function (event) {
            handler(this.dataset.product);
        });
    }

    bindProductCategory(handler) {
        $("#categorias").find('a').click(function (event) {
            handler(this.dataset.category);
        });
    }
}

export { StoreHouseView };