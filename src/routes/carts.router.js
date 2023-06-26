import { Router } from "express";
import fs from "fs";
import { __dirname } from "../utils.js";
// import CartsManager from "../persistencia/dao/fileManager/cartsManager.js";
// import CartsManager from "../persistencia/dao/mongoManager/cartsManager.js";
// import { productManager } from "./products.router.js";
import { resolveAny } from "dns";
import {CartAll,CarById,createCar,productsInCar,modifiedCar,QuantityUpdate,CarProductsDelete,prodFromCarDelete,carRemoved, createCarAdmin,createCarInUserRegister} from '../controllers/carts.controller.js';
import { isAdmin, isUser } from "../middlewares/authentLogin.js";
import {ticketCreated} from '../controllers/ticket.controller.js';



const router = Router();
// const cartsManager = new CartsManager(__dirname + "/cart.json");
// const pathJSON = __dirname + "/cart.json";

//Todos los carros
router.get("/", CartAll);

//Carro por id
router.get("/:cid", CarById);

//crea un carro
router.post("/", createCar);

//Crea un carro cuando el usuario se registra
router.post("/CreateCarInUserRegister", createCarInUserRegister)

//Crea un carro en cualquier usuario siendo admin + userId
router.post("/admin/:userId",isAdmin, createCarAdmin);

//Agrega productos al carro
router.post("/:cid/product/:pid",productsInCar);

//Modificar el carro completo
router.put("/:cid", modifiedCar);

//Cambia cantidad de producto
router.put("/:cid/product/:pid", QuantityUpdate);

//borra todos los productos del carrito
router.delete("/:cid", CarProductsDelete);

//borra un producto por id del carrito
router.delete("/:cid/product/:pid", prodFromCarDelete);

//borra un carro de la base de datos
router.delete("/delall/:cid",isAdmin, carRemoved);

//Ticket
router.post('/:cid/purchase',ticketCreated)

export default router;
