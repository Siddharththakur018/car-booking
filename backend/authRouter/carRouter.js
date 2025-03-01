const express = require("express");
const Car = require("../model/car-model");
const carRouter = express.Router();
const {getCar, getCarModels, addCar, updateCar, deleteCar} = require("../controller/car-controller")

carRouter.get('/', getCarModels);
carRouter.get('/brands', getCar);
carRouter.post('/addCar', addCar);
carRouter.put('/:id', updateCar);
carRouter.delete('/:id', deleteCar);
carRouter.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const car = await Car.findById(id);

        if (!car) {
            return res.status(404).json({ message: "Car Not Found" });
        }

        res.status(200).json(car);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});


module.exports = carRouter;