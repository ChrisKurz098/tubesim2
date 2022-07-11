const { Schema, model } = require('mongoose');

const statsSchema = new Schema({
    lastCh: {
        type: Number,
        default: 0
    },
    currentCh: {
        type: Number,
        default: 0
    },
    volume: {
        type: Number,
        default: 0
    },
    horShift: {
        type: Number,
        default: 0
    },
    vertShift: {
        type: Number,
        default: 0
    },
    horSize: {
        type: Number
        ,
        default: 1
    },
    vertSize: {
        type: Number,
        default: 1
    },
    watched:[[]]
})

module.exports = statsSchema;