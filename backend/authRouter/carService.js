const express = require("express");
const serviceRouter = express.Router();
const {getService, addService, updateService, deleteService} = require("../controller/services-controller");

serviceRouter.get('/', getService);
serviceRouter.post('/addService', addService);
serviceRouter.put('/:id', updateService);
serviceRouter.delete('/:id', deleteService);

module.exports = serviceRouter;