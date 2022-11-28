const mongoose = require("mongoose");

const SENSORSchema = mongoose.Schema({
        namesensor: { 
            type: String,
            require: true
        },
        value: { 
            type: Number,
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