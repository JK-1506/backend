const router = require("express").Router();
const sensorController = require("../controllers/sensorControllers");

//Create sensor
router.post("/", sensorController.createSensor);

//Get all sensor
router.get("/",sensorController.getAllSensor);

//Get sensor by date
router.post("/date", sensorController.getSensorByDate);

//Get sensor by is device
router.post("/device", sensorController.getSensorByIdDevice);


module.exports = router;