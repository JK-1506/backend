const Device = require('../models/Device');
const User = require('../models/User');

const deviceController = {
    //Get all device
    getAllDevice: async (req, res) => {
        try {
            // const devices = [];
            const device = await Device.find();
            // await devices.push(device);
            res.status(200).json(device);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Create Device
    createDevice: async (req, res) => {
        try {
            const device = new Device(req.body);
            const savedDevice = await device.save();
            if(req.body.user){
                const user = User.findById(req.body.user);
                await user.updateOne({$push:{devices:savedDevice._id}});
            }
            res.status(200).json(savedDevice);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Get device by id
    getDeviceById: async (req, res) => {
        try {
            const device = await Device.findById(req.params.id).populate("sensors").populate("user");
            res.status(200).json(device);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Get device by user
    getDeviceByUser:  async (req, res) => {
        try {
            const device = await Device.find({user: req.body.user});
            res.status(200).json(device);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Get device by name
    getDeviceByName:  async (req, res) => {
        try {
            const device = await Device.find({namedevice: req.body.namedevice});
            res.status(200).json(device);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Get sensor
    getSensor:  async (req, res) => {
        try {
            const device = await Device.find({sensor: {id:req.params.id}});
            res.status(200).json(device);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },


    //Delete device
    deleteDevice: async (req, res) => {
        try {
            const removeDevice = await Device.remove({ _id: req.params.id });
            res.status(200).json(removeDevice);
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },

    //Update device
    updateDevice: async (req, res) => {

        try {
            const device = await Device.findById(req.params.id);
            await device.updateOne({ $set: req.body });
            res.status(200).json("Cập nhật thành công");
        } catch (err) {
            res.status(500).json({ message: err });
        }
    },
}

module.exports = deviceController;