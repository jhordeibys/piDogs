require('dotenv').config();
const axios = require('axios');
const {API_KEY} = process.env;
const { Dog, Temperament } = require("../db");
const { Op } = require("sequelize")

const getDogs = async() => {

    const dogsDB = await Dog.findAll();

    const dogsApi = await axios.get(`https://api.thedogapi.com/v1/breeds?API_KEY=${API_KEY}`)

    
    const allDogs = [...dogsDB, ...dogsApi.data];
    return allDogs;
    //{ attributes: ['name'] }
};

const getDogBreed = async(idRaza) => {
    
    let dogsFoundId = null
    if (idRaza.match("^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$")) {
        dogsFoundId = await Dog.findByPk(idRaza);
    } else {
        dogsFoundId = await axios.get(`https://api.thedogapi.com/v1/breeds/${idRaza}?API_KEY=${API_KEY}`);
    }
    const response = dogsFoundId.data;
    return response;
};


const getDogsByName = async(name) => {

   const dogsNameDB = await Dog.findAll({
        where: {
          name: {
            [Op.iLike]: `%${name}%`, // Busca coincidencias parciales en el nombre
          },
        }
    });

    const resp = await axios.get(`https://api.thedogapi.com/v1/breeds/search?API_KEY=${API_KEY}&name=${name}`);

    const dogsNameApi= resp.data

    return [...dogsNameApi, ...dogsNameDB]

};



const createDogs = async(image, name, height, weight, life_span, temperament) => {
    
    // Create the dog
    const newDog = await Dog.create({
        image, 
        name, 
        height, 
        weight, 
        life_span,
        temperament: temperament.name,
    });
    console.log(temperament)

   temperament.forEach( async (t) => {

        
        // Find temperament in DB
        const temp = await Temperament.findOne({ where: { name: t } })
        
        if (temp) newDog.addTemperament(temp)
    })
    return newDog;
}; 

const getTemperaments = async () => {
    const { data } = await axios.get(`https://api.thedogapi.com/v1/breeds?API_KEY=${API_KEY}`); 
    let tempFound = [];

    data.forEach(dog => {
        // 1- convertir el string en un arreglo
        if (dog.temperament) {
            const elems = dog.temperament.split(', ')
            // 2- concatenamos el array resultante
            tempFound = tempFound.concat(elems);
        }
    });

    // 3 - Eliminamos los duplicados
    let unique = [...new Set(tempFound)]

    // 4- creamos el array de objetos para hacer el bulk create
    const temperaments = unique.map((u) => { return { name: u } })
    
    // 5- ejecutamos el bulk create
    Temperament.bulkCreate(temperaments)

    return temperaments
};


module.exports = {
    getDogs,
    getDogBreed,
    getDogsByName,
    createDogs,
    getTemperaments
};