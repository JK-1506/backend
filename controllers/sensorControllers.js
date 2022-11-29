const Device = require("../models/Device");
const Sensor = require("../models/Sensor");

const sensorController = {
  //Get all sensor
  getAllSensor: async (req, res) => {
    try {
      const sensors = await Sensor.find().populate("device");
      res.status(200).json(sensors);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //Create sensor
  createSensor: async (req, res) => {
    try {
      const sensor = new Sensor(req.body);
      const savedSensor = await sensor.save();
      if (req.body.device) {
        const device = Device.findById(req.body.device);
        await device.updateOne({ $push: { sensors: savedSensor._id } });
      }
      res.status(200).json(savedSensor);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //Get by date
  getSensorByDate: async (req, res) => {
    try {
      const sensor = await Sensor.find({ date: req.body.date });
      res.status(200).json(sensor);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //Get by id device
  getSensorByIdDevice: async (req, res) => {
    try {
      let sensor;
      if (req.body.date) {
        sensor = await Sensor.find({
          device: req.body.device,
          date: {
            $gte: new Date(req.body.date).setUTCHours(0, 0, 0, 0),
            $lte: new Date(req.body.date).setUTCHours(23, 59, 59, 999),
          },
        }).sort({
          date: -1,
        });
      } else {
        sensor = await Sensor.find({
          device: req.body.device,
        }).sort({
          date: -1,
        });
      }
      res.status(200).json(sensor);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },

  //Thong ke
  getTKByDate: async (req, res) => {
    try {
      const sensor = await Sensor.find({ device: req.body.device });

      res.status(200).json(sensor);
    } catch (err) {
      res.status(500).json({ message: err });
    }
  },
};
module.exports = sensorController;
