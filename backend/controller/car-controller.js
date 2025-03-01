const Car = require("../model/car-model"); 

const getCarModels = async (req, res) => {
    try {
        const response = await Car.find({}, "name brand models fuelType transmissionType");
        // Ensure `_id` is returned
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



const getCar = async(req,res) => {
    try {
        const brands = await Car.find().distinct("brand");
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const addCar = async(req,res) => {
    try {
        const brands = await Car.create(req.body);
        res.status(200).json(brands);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

const updateCar = async(req,res) =>{
    try {
        const {id} = req.params;
        const response = await Car.findByIdAndUpdate(id, req.body);

        if(!response){
            res.status(404).json({message: "Car Not  Found"});
        }

        const updatedResponse = await Car.findById(response);
        res.status(200).json(updatedResponse)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteCar = async(req,res) =>{
    try {
        const {id} = req.params;
        const response = await Car.findByIdAndDelete(id, req.body);

        if(!response){
            res.status(404).json({message: "Car Not  Found"});
        }

        const updatedResponse = await Car.findById(response);
        res.status(200).json(updatedResponse)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    getCar,
    getCarModels,
    addCar,
    updateCar,
    deleteCar
}