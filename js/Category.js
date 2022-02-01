'use strict';
//Categoria
class Category {
    //Atributos
    #title;
    #description;
    //Constructor
    constructor(title, description = "No hay datos") {
        //Validacion
        if (!new.target) throw new InvalidAccessConstructorException(); //new
        if (!title) throw new EmptyValueException("title");
        //Asignacion
        this.#title = title;
        this.#description = description;
    }
    //Propiedades de acceso
    get title() {
        return this.#title;
    }

    set title(value) {
        if (!value) throw new EmptyValueException("title");
        this.#title = value;
    }

    get description(){
        return this.#description;
    }

    set description(value){
        if (!value) throw new EmptyValueException("description");
        this.#description = value;
    }
}