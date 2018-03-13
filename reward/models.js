'use strict';

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;


const RewardSchema = mongoose.Schema({
  rewardTitle: {type: String, default: '', required: true},
  rewardDescription: {type: String, default: '', required: true},
  created: {type: Date, default: Date.now}  
});


RewardSchema.methods.serialize = function() {

    return {
      id: this._id,
      rewardTitle: this.title,
      rewardDescription: this.description,
      created: this.created
    };
  }



const Reward = mongoose.model('Reward', RewardSchema);

module.exports = {Reward};