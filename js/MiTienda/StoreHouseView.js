import { StoreHouse } from "../StoreHouse.js";

class StoreHouseView {
    constructor() {
        this.main = $('main');
    }

    init(stores) {
        let store;
        this.main.empty();
        let titulo = $(`<div><h1 class="text-center ">TIENDAS</h1></div>`)
        let container = $(`<div class="d-flex justify-content-center m-5"></div>`);
        for (store of stores.stores){
            container.append( `<div class="card m-1 border border-primary" style="width: 18rem;">
            <div class="card-body">
            <h5 class="card-title">${store.store.name}</h5>
            <p class="card-text">Mire los productos que tenemos para usted</p>
            <a href="#" class="btn btn-primary">${store.store.name}</a>
            </div>
            </div>`
            )
        }
        this.main.append(titulo);
        this.main.append(container);
        
    }
}

export { StoreHouseView };