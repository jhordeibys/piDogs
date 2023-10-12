const { Router } = require('express');

const {getDogsHandler, getDogsIdHandler, getDogsNameHandler, postDogsHandler, getTemperamentsHandler}= require ("../handlers/dogsHandlers");

routerDogs = Router();

routerDogs.get("/dogs", getDogsHandler);
routerDogs.get("/dogs/:idRaza", getDogsIdHandler);
routerDogs.get("/dogs/name", getDogsNameHandler);
routerDogs.post("/dogs", postDogsHandler);
routerDogs.get("/temperaments", getTemperamentsHandler);

module.exports = routerDogs;
