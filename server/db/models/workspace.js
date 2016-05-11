'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    creator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    collaborator: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    text: {
        type: String,
        default: ''
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateLastModified: {
        type: Date,
        default: Date.now
    }
});

schema.pre('save', function (next) {
    this.dateLastModified = Date.now();
    next();
});

mongoose.model('Workspace', schema);
