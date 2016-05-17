'use strict';
var mongoose = require('mongoose');

var problem = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    problemCode: {
        type: String,
        // required: true
    },
    solutionCode: {
        type: String,
        // required: true
    },
    solutionVideo: {
        type: String,
        // required: true
    },
    difficulty: {
        type: Number // we gotta decide on a ranking system
    },
    tests: {
        type: String
        // required: true
    }
});

mongoose.model('Problem', problem);
