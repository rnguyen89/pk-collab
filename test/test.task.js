'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
const faker = require('faker');
const mongoose = require('mongoose');

const expect = chai.expect;

const {Task} = require('../task/models');
const {app, runServer, closeServer} = require('../server');

const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);


function seedTaskData() {
  console.info('seeding blog data');
  const seedData = [];

  for(let i=1; i<10; i++) {
    seedData.push(generateTask());
  }
  return Task.insertMany(seedData);
}

//generating data for db

function generateTitle() {
  const title = ['read', 'laundry', 'homework']
  return title[Math.floor(Math.random() * title.length)];
}

function generateDescription() {
  const description = ['this is a test description']
  return content[Math.floor(Math.random() * description.length)];
}

// function generateAuthorName() {
//   const author = {
//     firstName: ['tom', 'steve', 'hunter', 'willit'],
//     lastName: ['chung', 'brady', 'nguyen', 'dang']
//   }
//   return author[Math.floor(Math.random() * author.length)];
// }

//generate obj representing blog data
//use for seed data db
//or req.body data
function generateTask() {
  return {
    title: faker.title.generateTitle(),
    description: faker.description.generateDescription()
  };
}

//create teardown fn
function tearDownDb() {
  console.warn('Deleteing database');
  return mongoose.connection.dropDatabase();
}

describe('Task API resource', function() {
  before(function() {
    return runServer(TEST_DATABASE_URL);
  });

  beforeEach(function() {
    return seedTaskData();
  });

  afterEach(function() {
    return tearDownDb();
  });

  after(function() {
    return closeServer();
  });

describe('GET endpoint', function() {
  it('should return all existing tasks', function() {
    let res;
    return chai.requests(app)
    .get('/posts')
    .then(function(_res) {
      expect(res).to.have.status(200);
      expect(res,body.post).to.have.a.length.valueOf.at.least(1);
      return Task.count();
    })
    .then(function(count) {
      expect(res.body.post).to.have.at.length.of(count);
    });
  });
  //add second it function
  it('should return task with right fields', function() {
    let resTask;
    return chai.request(app)
    .get('/posts')
    .then(function(res) {
      expect(res).to.have.status.code(200);
      expect(res).to.be.json;
      expect(res.body.post).to.be.a('array');
      expect(res.body.post).to.have.length.of.at.least(1);

      resTask = res.body.post[0];
      return Task.findById(resTask);
    })
    .then(function(post) {
      expect(resTask.id).to.equal(post.id);
      expect(resTask.title).to.equal(post.title);
      expect(resTask.description).to.equal.toString(post.description);
    //   expect(resTask.author).to.equal.to(post.author);

    });
  });
});

describe('POST endpoint', function() {
  it('should add new post', function() {
    const newPost = generateBlogData();
    let mostRecentContent;

    return chai.request(app)
    .post('/')
    .send(newPost)
    .then(function(res) {
      expect(res).to.have.status(201);
      expect(res).to.be.json;
      expect(res.body).to.be.a('object');
      expect(res.body).to.include.keys(
        'id', 'title', 'description');
      expect(res.body.title).to.equal(newPost.title);
      expect(res.body.content).to.equal(newPost.content);
      expect(res.body.author).to.equal(newPost.author);
      return Task.findById(res.body.id);
    })
    .then(function(post) {
      expect(post.title).to.equal(newPost.title);
      expect(post.description).to.equal(newPost.description);
    //   expect(post.author.firstName).to.equal(newPost.author.firstName);
    //   expect(post.author.lastName).to.equal(newPost.author.lastName);
    });
  });
});

describe('PUT endoing', function() {
  it('should update files you send over', function() {
    const updateData = {
      title: 'title testing',
      content: 'testing the content'
    };
    return Task
      .findOne()
      .then(function(post) {
        updateData.id = post.id
        return chai.request(app)
          .put(`/posts/${post.id}`)
          .send(updateData)
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        return Task.findById(updateData.id);
      })
      .then(function(post) {
        expect(post.title).to.equal(updateData.title);
        expect(post.content).to.equal(updateData.content);
      });
  });
});

describe('DELETE endooint', function() {
  it('should delete a post by id', function() {
    let post;
    return Task
      .findOne()
      .then(function(_post) {
        post = _post;
        return chai.request(app).delete(`/posts/${post.id}`);
      })
      .then(function(res) {
        expect(res).to.have.status(204);
        return Task.findById(post.id);
      })
      .then(function(_post) {
        expect(_post).to.be.null;
      });
  });
});
});