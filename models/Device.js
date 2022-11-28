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
<<<<<<< HEAD
=======
    warning: { type: Boolean },
>>>>>>> 7ef4a5a54f3bf99b4793382b54883414515bbc87
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