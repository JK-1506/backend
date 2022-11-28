const router = require("express").Router();
const deviceController = require("../controllers/deviceControllers");

//Create device
router.post("/", deviceController.createDevice);

//Get all devices
router.get("/", deviceController.getAllDevice);

//Get device by id
router.get("/:id", deviceController.getDeviceById);

//Get device by id user
router.post("/user", deviceController.getDeviceByUser);

//Get device by name
router.post("/name", deviceController.getDeviceByName);

//Get sensor
router.post("/sensor", deviceController.getSensor);

//Delete device
router.delete("/:id", deviceController.deleteDevice);

//Update device
router.put("/:id", deviceController.updateDevice);

module.exports = router;