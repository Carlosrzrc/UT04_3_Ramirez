import { StoreHouseController } from './StoreHouseController.js';
import { StoreHouseView } from './StoreHouseView.js';
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

$(function () {
    const StoreHouseApp = new StoreHouseController(
        StoreHouse.getInstance("Almacen"), new StoreHouseView()
    );
});
