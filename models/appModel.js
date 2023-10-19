const mongoose = require('mongoose')

const appSchema = mongoose.Schema({
    app : {
        type: String,
        required: true
    },
    runtime : {
        type: Number,
        required: true
    },
    date : {
        type: String,
        required: true
    },
    timespan: {
        type: String,
        required: true
    },
    process_name : {
        type: String,
        required: true
    }
}, {
    timestamps: true
})



module.exports = mongoose.model('apps', appSchema, "openedApps")