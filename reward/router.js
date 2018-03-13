'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const { Reward } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });

router.get('/', jwtAuth, (req, res) => {
    console.log('hello world');
      Reward
        .find()
        .then(rewards => {
          res.json(rewards.map(reward => reward.serialize()));
        })
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Internal server error' });
        });
    });
    
    router.get('/:id', (req, res) => {
      Reward
        .findById(req.params.id)
        .then(post => res.json(post.serialize()))
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Something went wrong!' });
        });
    });
    
    router.post('/', (req, res) => {
    
      const requiredFields = ['rewardTitle', 'rewardDescription'];
      for (let i = 0; i < requiredFields.length; i++) {
        const field = requiredFields[i];
        if (!(field in req.body)) {
          const message = `Missing \`${field}\` in request body`;
          console.error(message);
          return res.status(400).send(message);
        }
      }
    
      Reward
        .create({
          rewardTitle: req.body.rewardTitle,
          rewardDescription: req.body.rewardDescription,
          created: req.body.created
        })
        .then(task => res.status(201).json(task.serialize()))
        .catch(err => {
          console.error(err);
          res.status(500).json({ message: 'Something went wrong' });
        });
    });

router.put('/:id', jwtAuth, (req, res) => {

    const toUpdate = {};
    const updateableFields = ['rewardTitle', 'rewardDescription'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    User
      .findByIdAndUpdate(req.params._id, {$set: req.body}, { new: true })
      .then(updatedPost => res.status(204).end())
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });
  
  module.exports = {router};
  