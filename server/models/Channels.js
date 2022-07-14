const { Schema, model } = require('mongoose');



const channelsSchema = new Schema({
    name: {
        type: String,
        default: "Ch1 - Price is Right"
    },
    list: {
        Type: Array,
        default: ['PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5', 'PL8qCHhbAE4pOUkwTUoGISIfrFNO9uXFk5']
    },
    episodes: {
        type: Number,
        default: 200
    },
    randomPoint: {
        type: Boolean,
        deafult: false
    }

})

module.exports = channelsSchema;