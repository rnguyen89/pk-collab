'use strict';

const express = require("express");
const bodyParser = require("body-parser");
const { Task } = require("./models");
const router = express.Router();
const jsonParser = bodyParser.json();
const passport = require("passport");
const jwtAuth = passport.authenticate("jwt", { session: false });


router.get('/', jwtAuth, (req, res) => {
    Task
      .find({user: req.user.id})
      .then(tasks => {
        res.json(tasks.map(task => task.serialize()));
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
      });
  });
  
  router.get('/:id', (req, res) => {
    Task
      .findById(req.params.id)
      .then(post => res.json(post.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong!' });
      });
  });
  
  router.post('/', jwtAuth, (req, res) => {
  
    const requiredFields = ['title'];
    for (let i = 0; i < requiredFields.length; i++) {
      const field = requiredFields[i];
      if (!(field in req.body)) {
        const message = `Missing \`${field}\` in request body`;
        console.error(message);
        return res.status(400).send(message);
      }
    }
  
    Task
      .create({
        title: req.body.title,
        description: req.body.description,
        created: req.body.created,
        //adding create user
        user: req.user.id
      })
      .then(task => res.status(201).json(task.serialize()))
      .catch(err => {
        console.error(err);
        res.status(500).json({ message: 'Something went wrong' });
      });
  });
  
  router.delete('/:id', (req, res) => {
    Task
      .findByIdAndRemove(req.params.id)
      .then(() => {
        res.status(204).json({message: 'success'});
      })
      .catch(err => {
        console.error(err);
        res.status(500).json({error: 'something went terribly wrong'});
      });
    });
  
  
  router.put('/:id', (req, res) => {
    
    if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
      res.status(400).json({
        error: 'Request oath id and request body id values must match'
      });
    }
  
    const toUpdate = {};
    const updateableFields = ['title', 'description', 'created', 'board'];
    updateableFields.forEach(field => {
      if (field in req.body) {
        toUpdate[field] = req.body[field];
      }
    });
  
    Task
      .findByIdAndUpdate(req.params.id, {$set: req.body}, { new: true })
      .then(updatedPost => res.status(204).end())
      .catch(err => res.status(500).json({ message: 'Something went wrong' }));
  });
  
  router.use('*', function(req, res) {
    res.status(404).json({message: 'Not found'});
  });
  
  
  
  
module.exports = {router};

