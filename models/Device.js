const mongoose = require("mongoose");

const DEVICESchema = mongoose.Schema({
    namedevice: {
        type: String,
        require: true
    },
    descdevice: {
        type: String,
        require: true
    },
    date: { type: Date, default: Date.now },
    active: { type: Boolean },
    phone: {
        type: String,
        require: true
    },
    sensors: 
    [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "SENSOR",
    }],
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "USER",
    },
}
    , { timestamps: true }
);

module.exports = mongoose.model('DEVICE', DEVICESchema);