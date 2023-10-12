const {getDogs, getDogBreed, getDogsByName, createDogs, getTemperaments } = require("../controllers/dogsController.js");

const getDogsHandler = async (req, res) => {
    try {
        const response = await getDogs();
        res.status(200).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getDogsIdHandler = async (req, res) => {
    try {
        const {idRaza} = req.params
        const response = await getDogBreed(idRaza);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getDogsNameHandler = async (req, res) => {
    try {
        const {name} = req.query;
        console.log("holaaaa", name);
        const response = await getDogsByName(name);
        res.status(200).json(response)
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const postDogsHandler = async (req, res) => {
    try {
        const {image, name, height, weight, life_span, temperament} = req.body;

        if (!image || !name || !height || !weight || !life_span || !temperament) 
        return res.status(401).send("imcomplete information");

        const response = await createDogs(
            image,
            name, 
            height, 
            weight, 
            life_span,
            temperament
            );
        res.status(201).json(response);
    } catch (error) {
        res.status(400).json({error: error.message});
    }
};

const getTemperamentsHandler = async (req, res) => {
    try {
        const response = await getTemperaments();
        res.status(200).json(response);
        
    } catch (error) {
        res.status(500).json({error: error.message});
    }
};


module.exports = {
    getDogsHandler,
    getDogsIdHandler,
    getDogsNameHandler,
    postDogsHandler,
    getTemperamentsHandler
};