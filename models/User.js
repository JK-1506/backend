const mongoose = require("mongoose");

const USERSchema = mongoose.Schema({
    username: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true
    },
    name: {
        type: String,
        require: true
    },
    address: {
        type: String,
        require: true
    },
    devices:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DEVICE",
    }],
},
    { timestamps: true }
);

module.exports = mongoose.model('USER', USERSchema);
