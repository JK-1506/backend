const mongoose = require("mongoose");

const SENSORSchema = mongoose.Schema({
        namesensordisplay: { 
            type: String,
            require: true
        },
        namesensor: { 
            type: String,
            require: true
        },
        unit: { 
            type: String,
            require: true
        },
        device:
        {
            type:mongoose.Schema.Types.ObjectId,
            ref: "DEVICE",
        },

    date: { type: Date, default: Date.now},
});

module.exports = mongoose.model('SENSOR',SENSORSchema );