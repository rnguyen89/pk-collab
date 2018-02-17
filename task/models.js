'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//creating task schema
const TaskSchema = mongoose.Schema({
  title: {type: String, required: true},
  description: {type: String},
  board: {type: String, default: "todo"},
  created: {type: Date, default: Date.now}
});



const Task = mongoose.model('Task', TaskSchema);

module.exports = {Task};