const { Schema, model } = require('mongoose');

const Stats = new Schema({
    lastCh: {
        type: Number
    },
    currentCh: {
        type: Number
    },
    volume: {
        type: Number
    },
    horShift: {
        type: Number
    },
    vertShift: {
        type: Number
    },
    horSize: {
        type: Number
    },
    vertSize: {
        type: Number
    }
})

module.exports = Stats;