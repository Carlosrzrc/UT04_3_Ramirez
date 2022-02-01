'use strict';
//Producto
class Product {
    //Atributos
    #serialNumber;
    #name;
    #description;
    #price;
    #tax;
    #images;
    //Constructor
    constructor(serialNumber,name,description = "N/S",price,tax = Product.IVA,images = []){
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
    //Propiedad statica
    static get IVA(){
		return 21;
	}

    get images(){
        return this.#images;
    }

    set images(value){
        if (!value) throw new EmptyValueException("images")
        this.#images = value;
    }

    toString(){
		return "Serial: " + this.#serialNumber + " Name: " + this.#name + " Price: " + this.#price;
	}
    
}

class Ropa extends Product{
    //Atributos
    #tejido;
    #talla;
    #marca;
    constructor(serialNumber,name,description = "N/S",price,tax = Product.tax,images = [],tejido,talla,marca){
        if (!new.target) throw new InvalidAccessConstructorException();
        super(serialNumber,name,description = "N/S",price,tax = Product.tax,images = []);
        //Validación
        if (!tejido) throw new EmptyValueException("tejido");
        if (!talla) throw new EmptyValueException("talla");
        if (!marca) throw new EmptyValueException("marca");
        //Asignacion
        this.#tejido = tejido;
        this.#talla = talla;
        this.#marca = marca;
    }
    //Propiedades de acceso
    get tejido (){
        return this.#tejido
    }

    set tejido(value){
        if (!value) throw new EmptyValueException("tejido");
        this.#tejido = value;
    }

    get talla (){
        return this.#talla
    }

    set talla(value){
        if (!value) throw new EmptyValueException("talla");
        this.#talla = value;
    }

    get marca (){
        return this.#marca
    }

    set marca(value){
        if (!value) throw new EmptyValueException("marca");
        this.#marca = value;
    }

    toString (){
		return super.toString() + " Tejido: " + this.#tejido + " Talla: " + this.#talla + " Marca: " + this.#marca;
	}

}

class Joyas extends Product{
    //Atributos
    #material;
    #talla;
    #marca;
    #tipo;
    constructor(serialNumber,name,description = "N/S",price,tax = Product.tax,images = [],material,talla,marca,tipo){
        if (!new.target) throw new InvalidAccessConstructorException();
        super(serialNumber,name,description = "N/S",price,tax = Product.tax,images = []);
        //Validación
        if (!material) throw new EmptyValueException("material");
        if (!talla) throw new EmptyValueException("talla");
        if (!marca) throw new EmptyValueException("marca");
        if (!tipo) throw new EmptyValueException("tipo");
        //Asignacion
        this.#material = material;
        this.#talla = talla;
        this.#marca = marca;
        this.#tipo = tipo;
    }
    //Propiedades de acceso
    get material (){
        return this.#material
    }

    set material(value){
        if (!value) throw new EmptyValueException("material");
        this.#material = value;
    }

    get talla (){
        return this.#talla
    }

    set talla(value){
        if (!value) throw new EmptyValueException("talla");
        this.#talla = value;
    }

    get marca (){
        return this.#marca
    }

    set marca(value){
        if (!value) throw new EmptyValueException("marca");
        this.#marca = value;
    }

    get tipo (){
        return this.#tipo
    }

    set tipo(value){
        if (!value) throw new EmptyValueException("tipo");
        this.#tipo = value;
    }

    toString (){
		return super.toString() + " Material: " + this.#material + " Talla: " + this.#talla + " Marca: " + this.#marca + " Tipo: " + this.#tipo;
	}
}

class Instrumento extends Product{
    //Atributos
    #tipo;
    #color;
    constructor(serialNumber,name,description = "N/S",price,tax = Product.tax,images = [],tipo,color){
        if (!new.target) throw new InvalidAccessConstructorException();
        super(serialNumber,name,description = "N/S",price,tax = Product.tax,images = []);
        //Validación
        if (!tipo) throw new EmptyValueException("tipo");
        if (!color) throw new EmptyValueException("color");
        //Asignacion
        this.#tipo = tipo;
        this.#color = color;
        
    }
    //Propiedades de acceso
    get tipo (){
        return this.#tipo
    }

    set tipo(value){
        if (!value) throw new EmptyValueException("tipo");
        this.#tipo = value;
    }

    get color (){
        return this.#color
    }

    set color(value){
        if (!value) throw new EmptyValueException("color");
        this.#color = value;
    }

    toString (){
		return super.toString() + " Tipo: " + this.#tipo + " Color: " + this.#color;
	}
}