'use strict';
//Tienda
class Store {
    //Atributos
    #CIF;
    #name;
    #address;
    #phone;
    #coords;
    //Constructor
    constructor(CIF, name, address = "N/S", phone = "N/S", coords = new Coords("0", "0")) {
        //Validacion
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!CIF) throw new EmptyValueException("CIF");
        if (!name) throw new EmptyValueException("name");
        //Asignacion
        this.#CIF = CIF;
        this.#name = name;
        this.#address = address;
        this.#phone = phone;
        this.#coords = coords;
    }
    //Propiedades de acceso
    get CIF() {
        return this.#CIF;
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (!value) throw new EmptyValueException("name");
        this.#name = value;
    }

    get address() {
        return this.#address;
    }

    set address(value) {
        if (!value) throw new EmptyValueException("address");
        this.#address = value;
    }

    get phone() {
        return this.#phone;
    }

    set phone(value) {
        if (!value) throw new EmptyValueException("phone");
        this.#phone = value;
    }

    get coords() {
        return this.#coords;
    }

    set coords(value) {
        if (!value) throw new EmptyValueException("coords");
        this.#coords = value;
    }
}