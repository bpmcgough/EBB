'use strict';
var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    toUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    fromUser: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    scenarioType: {
        type: String,
        enum: ['workspace', 'friend', 'Interviewee', 'Interviewer', 'Solve']
    },
    workspaceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Workspace'
    }
});

mongoose.model('Notification', schema);
