import { StoreHouse } from "../StoreHouse.js";
import { defaultCheckElement, newCategoryValidation, newStoreValidation, LoginValidation, getCookie, setCookie } from "../validation.js";

class StoreHouseView {
  constructor() {
    this.main = $('main');
    this.section = $("section.product");
    this.ficha = $("section.ficha");
    // this.productWindow = null;
    this.productWindow = [];

  }
  //INICIO TIENDAS MAIN
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
  //MUESTRA CATEGORIAS EN NAVBAR
  showCategoriesInMenu(categories) {
    let menu = $('#categorias');
    menu.empty();
    for (let category of categories) {
      menu.append(`<li><a data-category="${category.title}" class="dropdown-item" href="#titulo">${category.title}</a></li>
                `)
    }
  }
//MUESTRA TIENDAS EN NAVBAR
  showStoresInMenu(stores) {
    let menu = $('#stores');
    menu.empty();
    for (let store of stores) {
      menu.append(`<li><a data-store="${store.CIF}" class="dropdown-item" href="#titulo">${store.name}</a></li>
                `)
    }
  }
  //BOTON LOGIN MUESTRA FORMULARIO
  showLogin() {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div class="formulario" id="form" style="background-color: rgb(111, 212, 150); center; padding: 6%; margin: 3% 30%"> 
    <form name="login" class="row g-3" style="background-color: white; padding: 5%;">
    <h1 style="text-align: center;">LOGIN</h1>
    <div class="col-12">
        <label for="nombre" class="form-label">Nombre: *</label>
        <input type="text" class="form-control" id="nombre" required>
        <div class="invalid-feedback">El nombre es obligatorio</div>
            <div class="valid-feedback">Correcto.</div>
    </div>
    <div class="col-12">
        <label for="pass" class="form-label">Contraseña: *</label>
        <input type="password" class="form-control" id="pass" required>
        <div class="invalid-feedback">La contraseña es obligatoria</div>
            <div class="valid-feedback">Correcto.</div>
    </div>
    <div class="text-center">
    <button type="submit" class="btn btn-primary">Login</button>
        <button type="reset" class="btn btn-primary">Cancelar</button>
        </div>
</form>`);
    this.main.append(container);
  }
  //MODAL DE ERROR AL LOGEAR
  showModalLoginError() {
    let modal = $(`<div style="color: red;" class="modal fade" id="loginError" tabindex
   ="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="loginError" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="loginError">Error credenciales</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    Las credenciales de acceso son incorrectas
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
    $('body').append(modal);
    let loginError = $('#loginError');
    loginError.modal('show');
    loginError.find('button').click(() => {
      loginError.on('hidden.bs.modal', function (event) {
        document.login.reset();
        document.login.name.focus();
        this.remove();
      });
      loginError.modal('hide');
    })
  }

  //VALIDADOR DE LOGIN
  bindLoginForm(handler) {
    LoginValidation(handler);
  }
  //BIND DE MOSTRAR LOGIN
  bindShowLogin(handler) {
    $('#login').click((event) => {
      handler();
    });
  }

  //COOKIES
  createCookies(nombre, pass) {
    document.cookie = 'Nombre =' + nombre;
  }

  checkCookie() {
    let co = getCookie("Nombre");
    if (getCookie("Nombre") != "") {
      let h = $('#showlogin');
      h.empty();
      h.append(`<div style="color: white">
    <h5>Hola ${co}</h5>
    <a href="#" id="outsesion" class="btn btn-danger btn-sm">Cerrar sesión</a></div>`);
    }
  }

  deleteCookie() {
    setCookie("Nombre", '', -1);
  }

  bindDeleteCookie(handler) {
    $(document).on('click', "#outsesion", function (event) {
      handler(handler);
    });
  }

  showMenu() {
    let menu = $('#menu');
    menu.append(`<li><a class="dropdown-item" id="inP">Insertar producto</a></li>
    <li><a class="dropdown-item" id="delP">Eliminar producto</a></li>
    <li><a class="dropdown-item" id="inC">Insertar categoria</a></li>
    <li><a class="dropdown-item" id="delC">Eliminar categoria</a></li>
    <li><a class="dropdown-item" id="inT">Insertar tienda</a></li>
    <li><a class="dropdown-item" id="delT">Eliminar tienda</a></li>
    <li><a class="dropdown-item" id="gen">Generar backup</a></li>
    `)
  }
  //BACKUP
  bindBackUp(handler) {
    $('#gen').click(function (event) {
      handler(handler);
    });
  }

  createBackUp() {
    const promise = new Promise((resolve, reject) => {
      const request = new XMLHttpRequest();
      request.open('GET', '../../objects.json');
      request.onload = () => {
        if (request.status === 200) {
          resolve(request.response); // Obtenemos los datos para resolver la Promesa
        } else {
          reject(new Error(request.statusText)); // Obtenemos el error pasándo como argumento el texto.
        }
      };
      request.onerror = () => {
        reject(new Error('Error fetching data.')); // Se ha producido un error, rechazamos la promesa
      };
      request.send(); // Enviamos la petición
    });
    promise.then((data) => { // data contiene la respuesta
      //INTENTO CREACION FICHERO
      // let time = Date.now();
      // let fecha = new Date(time);
      // fecha = fecha.toISOString();
      // let error = new File([data],fecha+'.json');
      // let imageURL = window.URL.createObjectURL(error);
      // console.log(error);
    }, (error) => { // error contiene el objeto creado para rechazar la prome
      sa
      console.log('Promise rejected.');
      addMessage(error.message);
    });
  }

  //FORMULARIO
  ShowNewCategoryForm() {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div class="formulario" id="form" style="background-color: rgb(111, 212, 150); padding: 10%; margin: 3% 10%">    
    <form name="fNewCategory" role="form" class="row g-3" style="background-color: white; padding: 5%;" novalidate>
      <h1>Insertar Categoria</h1>
        <div class="col-12">
            <label for="ncTitle" class="form-label">Nombre: *</label>
            <input type="text" class="form-control" id="ncTitle" required>
            <div class="invalid-feedback">El nombre es obligatorio</div>
            <div class="valid-feedback">Correcto.</div>
        </div>
        <div class="col-12">
            <label for="ncDescription" class="form-label">Descripción:</label>
            <input type="text" class="form-control" id="ncDescription" required>
            <div class="invalid-feedback">La descripción es obligatoria</div>
            <div class="valid-feedback">Correcto.</div>
        </div>
        <div class="text-center mt-3">
        <button type="submit" class="btn btn-primary">Enviar</button>
        <button type="reset" class="btn btn-primary">Cancelar</button>
        </div>
    </form>
</div>`);
    this.main.append(container);
  }
  //MENU FORMULARIOS
  bindFormAddCategory(handler, remove, addT, delT, delP) {
    $('#inC').click(function (event) {
      handler(handler);
    });
    $('#delC').click(function (event) {
      remove(remove);
    });
    $('#inT').click(function (event) {
      addT(addT);
    });
    $('#delT').click(function (event) {
      delT(delT);
    });
    $('#delP').click(function (event) {
      delP(delP);
    });
  }

  bindNewCategoryForm(handler) {
    newCategoryValidation(handler);
  }

  showNewCategoryModal(done, cat, error) {
    $(document.fNewCategory).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex
   ="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="newCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="newCategoryModalLabel">Categoría creada</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    La categoría <strong>${cat.title}</strong> ha sido creada correctamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
      $('body').append(modal);
      let newCategoryModal = $('#newCategoryModal');
      newCategoryModal.modal('show');
      newCategoryModal.find('button').click(() => {
        newCategoryModal.on('hidden.bs.modal', function (event) {
          document.fNewCategory.reset();
          document.fNewCategory.ncTitle.focus();
          this.remove();
        });
        newCategoryModal.modal('hide');
      })
    } else {
      $(document.fNewCategory).prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> La categoría <strong>${cat.title}</strong> ya está creada.
   </div>`);
    }
  }

  //cat

  showRemoveCategoryForm(categories) {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div id="remove-category" class="container my-3 text-center">
    <h1 class="display-5">Eliminar una categoría </h1>
    <div id="category-list" class="row justify-content-center"></div>
    </div>`);
    for (let category of categories) {
      container.children().nextAll('div').append(`<div class="cat col-lg3 col-md-3 text-center m-2 p-1" style="border: solid 2px black;"><p data-category="${category.title}" href="#productlist">
    <div class="cat-listimage">
    </div>
    <div class="cat-list-text">
    <h3>${category.title}</h3>
    <div><button class="btn btn-primary" data-category="${category.title}" type='button'>Eliminar</button></div>
    </div>
    </div>`);
    }
    this.main.append(container);
  }

  showRemoveCategoryModal(done, cat, position, error) {
    $('remove-category').find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removeCategoryModal" tabin
   dex="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="removeCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="removeCategoryModalLabel">Categoría eliminada</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    La categoría <strong>${cat.title}</strong> ha sido eliminada
   correctamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
      $('body').append(modal);
      let removeCategoryModal = $('#removeCategoryModal');
      removeCategoryModal.modal('show');
      removeCategoryModal.find('button').click(() => {
        removeCategoryModal.on('hidden.bs.modal', function (event) {
          this.remove();
        });
        removeCategoryModal.modal('hide');
        // let divCat = $('#remove-category').find(`div > div:nthchild(${position + 1})`);
        // divCat.remove();
      })
    } else {
      $('#removeCategoryModal').prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> La categoría <strong>${cat.title}</strong> no exite en el
   Manager.</div>`);
    }
  }

  bindRemoveCategoryForm(handler) {
    $('#remove-category').find('button').click(function (event) {
      handler(this.dataset.category, $(this).closest('div.cat').index());
    })
  }

  showRemoveStoreForm(stores) {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div id="remove-store" class="container my-3 text-center">
    <h1 class="display-5">Eliminar una tienda </h1>
    <div id="category-list" class="row justify-content-center"></div>
    </div>`);
    for (let store of stores) {
      container.children().nextAll('div').append(`<div class="cat col-lg3 col-md-3 text-center m-2 p-1" style="border: solid 2px black;"><p data-store="${store.CIF}" href="#productlist">
    <div class="cat-listimage">
    </div>
    <div class="cat-list-text">
    <h3>${store.name}</h3>
    <div><button class="btn btn-primary" data-store="${store.CIF}" type='button'>Eliminar</button></div>
    </div>
    </a>
    </div>`);
    }
    this.main.append(container);
  }

  showRemoveStoreModal(done, store, position, error) {
    $('remove-store').find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removeStoreModal" tabin
   dex="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="removeStoreModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="removeStoreModalLabel">Tienda eliminada eliminada</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    La tienda <strong>${store.name}</strong> ha sido eliminada
   correctamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
      $('body').append(modal);
      let removeStoreModal = $('#removeStoreModal');
      removeStoreModal.modal('show');
      removeStoreModal.find('button').click(() => {
        removeStoreModal.on('hidden.bs.modal', function (event) {
          this.remove();
        });
        removeStoreModal.modal('hide');
        // let divCat = $('#remove-Store').find(`div > div:nthchild(${position + 1})`);
        // divCat.remove();
      })
    } else {
      $('#removeStoreModal').prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> La categoría <strong>${store.name}</strong> no exite en el
   Manager.</div>`);
    }
  }

  bindRemoveStoreForm(handler) {
    $('#remove-store').find('button').click(function (event) {
      handler(this.dataset.store, $(this).closest('div.cat').index());
    })
  }
  //REMOVE PRODUCT
  showRemoveProductForm(products) {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div id="remove-product" class="container my-3 text-center">
    <h1 class="display-5">Eliminar un producto </h1>
    <div id="product-list" class="row justify-content-center"></div>
    </div>`);
    for (let product of products) {
      container.children().nextAll('div').append(`<div class="cat col-lg3 col-md-3 text-center m-2 p-1" style="border: solid 2px black;"><p data-product="${product.serialNumber}" href="#productlist">
    <div class="cat-listimage">
    <img alt="${product.name}" src="${product.images}" width="100px" height="100px" />
    </div>
    <div class="cat-list-text">
    <h3>${product.name}</h3>
    <div><button class="btn btn-primary" data-product="${product.serialNumber}" type='button'>Eliminar</button></div>
    </div>
    </a>
    </div>`);
    }
    this.main.append(container);
  }

  showRemoveProductModal(done, product, position, error) {
    $('remove-product').find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="removeProductModal" tabin
   dex="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="removeProductModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="removeProductModalLabel">Producto eliminado eliminada</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    El product <strong>${product.name}</strong> ha sido eliminado
   correctamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
      $('body').append(modal);
      let removeProductModal = $('#removeProductModal');
      removeProductModal.modal('show');
      removeProductModal.find('button').click(() => {
        removeProductModal.on('hidden.bs.modal', function (event) {
          this.remove();
        });
        removeProductModal.modal('hide');
        // let divCat = $('#remove-Product').find(`div > div:nthchild(${position + 1})`);
        // divCat.remove();
      })
    } else {
      $('#removeProductModal').prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> El producto <strong>${product.name}</strong> no exite en el
   Manager.</div>`);
    }
  }

  bindRemoveProductForm(handler) {
    $('#remove-product').find('button').click(function (event) {
      handler(this.dataset.product, $(this).closest('div.cat').index());
    })
  }

  ShowNewStoreForm() {
    this.main.empty();
    this.section.empty();
    this.ficha.empty();
    let container = $(`<div class="formulario" id="form" style="background-color: rgb(111, 212, 150); padding: 10%; margin: 3% 10%">
    
    <form name="fNewStore" class="row g-3" style="background-color: white; padding: 5%;">
    <h1>Insertar Tienda</h1>
            <div class="col-6">
                <label for="CIF" class="form-label">CIF: *</label>
                <input type="number" class="form-control" id="CIF" required>
                <div class="invalid-feedback">El CIF es obligatorio</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
            <div class="col-6">
                <label for="name" class="form-label">Nombre: *</label>
                <input type="text" class="form-control" id="name" required>
                <div class="invalid-feedback">El nombre es obligatorio</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
            <div class="col-4">
                <label for="address" class="form-label">Dirección: </label>
                <input type="text" class="form-control" id="address">
                <div class="valid-feedback">Correcto.</div>
            </div>
            <div class="col-4">
                <label for="tlf" class="form-label">Teléfono: </label>
                <input type="text" class="form-control" id="tlf" placeholder="623456789" pattern="6[0-9]{8}">
                <div class="invalid-feedback">El teléfono tiene que tener 9 numeros y empezar por 6</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
            <div class="col-4">
                <label for="coords" class="form-label">Coordenadas: </label>
                <input type="text" class="form-control" id="coords" placeholder="1-1" pattern="[0-9]-[0-9]">
                <div class="invalid-feedback">El formato debe ser 1-1</div>
                <div class="valid-feedback">Correcto.</div>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>
</div>`);
    this.main.append(container);
  }

  bindNewStoreForm(handler) {
    newStoreValidation(handler);
  }

  showNewStoreModal(done, store, error) {
    $(document.fNewStore).find('div.error').remove();
    if (done) {
      let modal = $(`<div class="modal fade" id="newCategoryModal" tabindex
   ="-1"
    data-backdrop="static" data-keyboard="false" role="dialog" arialabelledby="newCategoryModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
    <div class="modal-content">
    <div class="modal-header">
    <h5 class="modaltitle" id="newCategoryModalLabel">Categoría creada</h5>
    <button type="button" class="close" datadismiss="modal" aria-label="Close">
    <span aria-hidden="true">&times;</span>
    </button>
    </div>
    <div class="modal-body">
    La tienda <strong>${store.name}</strong> ha sido creada correctamente.
    </div>
    <div class="modal-footer">
    <button type="button" class="btn btn-primary" datadismiss="modal">Aceptar</button>
    </div>
    </div>
    </div>
    </div>`);
      $('body').append(modal);
      let newCategoryModal = $('#newCategoryModal');
      newCategoryModal.modal('show');
      newCategoryModal.find('button').click(() => {
        newCategoryModal.on('hidden.bs.modal', function (event) {
          document.fNewStore.reset();
          document.fNewStore.ncTitle.focus();
          this.remove();
        });
        newCategoryModal.modal('hide');
      })
    } else {
      $(document.fNewStore).prepend(`<div class="error text-danger p3"><i class="fas fa-exclamationtriangle"></i> La tienda <strong>${store.name}</strong> ya está creada.
   </div>`);
    }
  }



  showProductsStore(products, isMainEmpty) {
    if (isMainEmpty) {
      this.main.empty();
    }

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
          <a id="btNw" data-product="${product.serialNumber}" class="btn btn-primary">Nueva ventana</a>
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
          <a id="btNw" data-product="${product.serialNumber}" class="btn btn-primary">Nueva ventana</a>
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
          <a id="btNw" data-product="${product.serialNumber}" class="btn btn-primary">Nueva ventana</a>
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
          <a id="btNw" data-product="${product.serialNumber}" class="btn btn-primary">Nueva ventana</a>
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

  showProductInNewWindow(product) {
    let win = null;
    for (let item of this.productWindow) {
      if (item.name == product.serialNumber) {
        win = item;
      }
    }
    let main = $(win.document).find('main');
    main.empty();
    let container = $(`<div id="containerF" class="d-flex justify-content-center"></div>`);
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
    main.append(container);
    // this.productWindow.document.body.scrollIntoView();
    win.document.body.scrollIntoView();
  }

  closeWindows() {
    this.productWindow.forEach(element => {
      element.close();
    });
    this.productWindow.length = 0;
  }

  //HISTORY

  // #excecuteHandler(
  //   handler, handlerArguments, scrollElement, data, url, event){
  //    handler(...handlerArguments);
  //    $(scrollElement).get(0).scrollIntoView();
  //    history.pushState(data, null, url);
  //    event.preventDefault();
  //   }

  bindClose(handler) {
    $('#closeW').click(function (event) {
      handler();
    });
  }



  bindInit(handler) {
    $('#init').click((event) => {
      handler();
    });
  }


  bindProductsCategoryList(handler) {
    $('main').find('a').click(function (event) {
      handler(this.dataset.store, false);
    });
    $('#stores').find('a').click(function (event) {
      handler(this.dataset.store, true);
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

  bindMenu(handler) {
    $("#menu").find('a').click(function (event) {
      handler();
    });
  }

  // bindShowNewWindow(handler){
  //   $(document).on('click',"#btNw",(event) => {
  //     if (!this.productWindow || this.productWindow.closed){
  //       console.log(this.productWindow);
  //       this.productWindow = window.open("../producto.html", "ProductWindow","width=800, height=600, top=250, left=250");
  //       this.productWindow.addEventListener('DOMContentLoaded', () => {
  //         handler(event.target.dataset.product);
  //         });
  //     }
  //   });
  // }

  bindShowNewWindow(handler) {
    $(document).on('click', "#btNw", (event) => {
      let flag = false;
      for (let item of this.productWindow) {
        if (item.name == event.target.dataset.product && !item.closed) {
          flag = true;
          item.focus();
        }
      }
      if (!flag) {
        let windowP = window.open("../producto.html", "ProductWindow", "width=800, height=600, top=250, left=250");
        windowP.addEventListener('DOMContentLoaded', () => {
          handler(event.target.dataset.product);
        });
        windowP.name = event.target.dataset.product;
        this.productWindow.push(windowP);
      }

    });
  }






}

export { StoreHouseView };