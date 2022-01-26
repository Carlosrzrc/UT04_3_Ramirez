'use strict';

import { EmptyValueException, InvalidAccessConstructorException } from "../../Recursos/MiTiendaV2-MT1.3/js/mitienda/exceptions";

//Producto
class Product {
    //Atributos
    #serialNumber;
    #name;
    #description;
    #price;
    #tax;
    #images = [];
    //Constructor
    constructor(serialNumber,name,description = "N/S",price,tax = Product.tax,images){
        if (!new.target) throw new InvalidAccessConstructorException();
        if (!serialNumber) throw new EmptyValueException("serialNumber");
        if (!name) throw new EmptyValueException("name");
        if (!price) throw new EmptyValueException("price");
        //Asignación
        this.#serialNumber = serialNumber;
        this.#name = name;
        this.#description = description;
        this.#price = price;
        this.#tax = tax;
        this.#images = images;
    }

    get serialNumber(){
        return this.#serialNumber;
    }

    get name(){
        return this.#name;
    }

    set name(value){
        if (!value) throw new EmptyValueException("name")
        this.#name = value;
    }

    get description(){
        return this.#description;
    }

    set description(value){
        if (!value) throw new EmptyValueException("description")
        this.#description = value;
    }

    get price(){
        return this.#price;
    }

    set price(value){
        if (!value) throw new EmptyValueException("price")
        this.#price = value;
    }

    get tax(){
        return this.#tax;
    }

    static get tax(){
		return 21;
	}
    
}