import { StoreHouse } from "../StoreHouse.js";

class StoreHouseView {
    constructor() {
        this.main = $('main');
    }

    init(stores) {
        this.main.empty();
        let titulo = $(`<div><h1 class="text-center">TIENDAS</h1></div>`)
        let container = $(`<div id="container" class="d-flex justify-content-center flex-wrap m-5"></div>`);
        for (let store of stores.stores) {
            container.append(`<div class="card m-2 border border-primary" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${store.store.name}</h5>
            <p class="card-text">Mire los productos que tenemos para usted</p>
            <a href="#" id="${store.store.CIF}" class="btn btn-primary">${store.store.name}</a>
            </div>
            </div>`
            )
        }
        this.main.append(titulo);
        this.main.append(container);
    }

    showCategoriesInMenu(categories) {
        let menu = $('#categorias');
            for (let category of categories.categories){
                menu.append(`<li><a class="dropdown-item" href="#">${category.title}</a></li>
                `)
            }
    }

    showStoresInMenu(stores) {
        let menu = $('#stores');
            for (let store of stores.stores){
                menu.append(`<li><a class="dropdown-item" href="#">${store.store.name}</a></li>
                `)
            }
    }

    bindInit(handler) {
        $('#init').click((event) => {
            handler();
        });
    }

    bindProducts(handler) {
        $('#buttonStore').click((event) => {
            handler();
        });
    }
}

export { StoreHouseView };