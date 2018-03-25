'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


//creating task schema
const TaskSchema = mongoose.Schema({
  title: {type: String, required: false},
  points: {type: Number},
  description: {type: String},
  board: {type: String, default: "todo"},  
  created: {type: Date, default: Date.now},
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});


TaskSchema.methods.serialize = function() {

    return {
      id: this._id,
      title: this.title,
      points: this.points,
      description: this.description,
      board: this.board,  
      created: this.created,
      user: this.user
    };
  }



const Task = mongoose.model('Task', TaskSchema);

module.exports = {Task};