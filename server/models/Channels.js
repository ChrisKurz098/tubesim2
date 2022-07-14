const { Schema, model } = require('mongoose');



const channelsSchema = new Schema({
    name: {
        type: String,
        default: ""
    },
    list: {
        Type: Array,
        default: []
    },
    episodes: {
        type: Number,
        default: 200
    },
    randomPoint: {
        type: Boolean,
        deafult: 0
    }

})

module.exports = channelsSchema;