const Service = require("../model/service-model");

const getService = async(req,res) => {
    try {
        const response = await Service.find({});
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}


const addService = async(req,res) => {
    try {
        const response = await Service.create(req.body);
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const updateService = async(req,res) => {
    try {
        const {id} = req.params;
        const response = await Service.findByIdAndUpdate(id, req.body);
        if(!response){
            res.status(404).json({message: "Couldn't find the service"});
        }
        const updatedService = await Service.findById(response);
        res.status(200).json(updatedService);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

const deleteService = async(req,res) => {
    try {
        const {id} = req.params;
        const response = await Service.findByIdAndDelete(id, req.body);
        if(!response){
            res.status(404).json({message: "Service not found"});
        }
        const updatedResponse = Service.findById(response);
        res.status(200).json(updatedResponse)
    } catch (error) {
        res.status(500).json({messsage: error.message});
    }
}

module.exports = {
    getService,
    addService,
    updateService,
    deleteService
}