const mongoose = require("mongoose");

const SENSORSchema = mongoose.Schema({
<<<<<<< HEAD
=======
        namesensordisplay: { 
            type: String,
            require: true
        },
>>>>>>> 7ef4a5a54f3bf99b4793382b54883414515bbc87
        namesensor: { 
            type: String,
            require: true
        },
<<<<<<< HEAD
        value: { 
            type: Number,
=======
        unit: { 
            type: String,
>>>>>>> 7ef4a5a54f3bf99b4793382b54883414515bbc87
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