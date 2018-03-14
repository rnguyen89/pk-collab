'use strict';
global.DATABASE_URL = 'mongodb://localhost/jwt-auth-demo-test';
const chai = require('chai');
const chaiHttp = require('chai-http');
const jwt = require('jsonwebtoken');

const { app, runServer, closeServer } = require('../server');
const { User } = require('../users');
const { JWT_SECRET } = require('../config');

const expect = chai.expect;

// This let's us make HTTP requests
// in our tests.
// see: https://github.com/chaijs/chai-http
chai.use(chaiHttp);

describe('Auth endpoints', function () {
  const username = 'exampleUser';
  const password = 'examplePass';
  const firstName = 'Example';
  const lastName = 'User';

  before(function () {
    return runServer();
  });

  after(function () {
    return closeServer();
  });

  beforeEach(function() {
    return User.hashPassword(password).then(password =>
      User.create({
        username,
        password,
        firstName,
        lastName
      })
    );
  });

  afterEach(function () {
    return User.remove({});
  });

  describe('/api/auth/login', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(400);
        });
    });
    it('Should reject requests with incorrect usernames', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username: 'wrongUsername', password })        
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with incorrect passwords', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username, password: 'wrongPassword' })
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token', function () {
      return chai
        .request(app)
        .post('/api/auth/login')
        .send({ username, password })
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          expect(payload.user).to.deep.equal({
            username,
            firstName,
            lastName
          });
        });
    });
  });

  describe('/api/auth/refresh', function () {
    it('Should reject requests with no credentials', function () {
      return chai
        .request(app)
        .post('/api/auth/refresh')
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an invalid token', function () {
      const token = jwt.sign(
        {
          username,
          firstName,
          lastName
        },
        'wrongSecret',
        {
          algorithm: 'HS256',
          expiresIn: '7d'
        }
      );

      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('Authorization', `Bearer ${token}`)
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should reject requests with an expired token', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          },
          exp: Math.floor(Date.now() / 1000) - 10 // Expired ten seconds ago
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username
        }
      );

      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        .then(() =>
          expect.fail(null, null, 'Request should not succeed')
        )
        .catch(err => {
          if (err instanceof chai.AssertionError) {
            throw err;
          }

          const res = err.response;
          expect(res).to.have.status(401);
        });
    });
    it('Should return a valid auth token with a newer expiry date', function () {
      const token = jwt.sign(
        {
          user: {
            username,
            firstName,
            lastName
          }
        },
        JWT_SECRET,
        {
          algorithm: 'HS256',
          subject: username,
          expiresIn: '7d'
        }
      );
      const decoded = jwt.decode(token);

      return chai
        .request(app)
        .post('/api/auth/refresh')
        .set('authorization', `Bearer ${token}`)
        .then(res => {
          expect(res).to.have.status(200);
          expect(res.body).to.be.an('object');
          const token = res.body.authToken;
          expect(token).to.be.a('string');
          const payload = jwt.verify(token, JWT_SECRET, {
            algorithm: ['HS256']
          });
          expect(payload.user).to.deep.equal({
            username,
            firstName,
            lastName
          });
          expect(payload.exp).to.be.at.least(decoded.exp);
        });
    });
  });
});


//saving dashboard code here

// 'use strict';
// const STATE = {
//   taskId: 0,
//   total: 0,
//   points: 0,
//   tasks: []
// }

// function getTask() {
//   const options = {
//     url: '/api/task/',
//     dataType: 'json',
//     type: 'GET',
//     headers: {
//       Authorization: 'Bearer ' + localStorage.token
//     },
//     success: function (tasks) {
//       STATE.tasks = tasks
//       $('#todo').html('');
//       $('#inProgress').html('');
//       $('#done').html('');
//       console.log(tasks);
//       const todo = STATE.tasks.filter(task => {
//         if (task.board === 'todo') {
//           return true;
//         }
//       })
//       const inProgress = STATE.tasks.filter(task => {
//         if (task.board === 'inProgress') {
//           return true;
//         }
//       })
//       const done = STATE.tasks.filter(task => {
//         if (task.board === 'done') {
//           return true;
//         }
//       })

//       STATE.total = 0
//       STATE.points = 0

//       todo.forEach(task => {
//         STATE.total += task.points
//         $('#todo').append(generateNewCard(task));
//       })
//       inProgress.forEach(task => {
//         STATE.total += task.points
//         $('#inProgress').append(generateNewCard(task));
//       })
//       done.forEach(task => {
//         STATE.points += task.points
//         STATE.total += task.points
//         $('#done').append(generateNewCard(task));
//       })
//       $('.progress').html(`
//       <div class="determinate" style="width: ${STATE.total ? (STATE.points/STATE.total)*100 : 100}%"></div>

//       `)
//     }
//   };

//   $.ajax(options);
// }

// function initIt() {

//   $('#board').on('dragstart', '.task', function (event) {
//     event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
//   });

//   $('#board').on('submit', 'form', function (event) {
//     event.preventDefault();
//     console.log(event);
//     const form = $(event.target)
//     const data = {
//       title: form.find('.card-title').val(),
//       id: form.find('.cardId').val(),
//       board: form.find('.cardBoard').val(),
//       title: form.find('.card-title').val(),
//       points: form.find('.card-points').val(),
//       description: form.find('.cardDescription').val(),
//     }
//     let url = '/api/task/'
//     let method = 'POST'
//     if (data.id) {
//       url += data.id
//       method = 'PUT'
//     }
//     $.ajax({
//       url: url,
//       method: method,
//       dataType: 'json',
//       data: JSON.stringify(data),
//       headers: {
//         Authorization: 'bearer ' + localStorage.token,
//         'content-type': 'application/json'
//       },
//       success: function () {
//         STATE.taskId++
//         getTask();
//       }
//     })
//   });

//   $('#todo, #inProgress, #done').bind('dragover', function (event) {
//     event.preventDefault();
//   });

//   $('#todo, #inProgress, #done').bind('drop', function (event) {
//     console.log(event);
//     const newBoardId = event.currentTarget.id;
//     var notecard = event.originalEvent.dataTransfer.getData("text/plain");
//     // event.currentTarget.appendChild(document.getElementById(notecard));
//     event.preventDefault();
//     console.log(notecard);
//     const button = $(event.target)
//     const form = button.parent().parent()
//     const data = {
//       id: form.find('.cardId').val(),
//       board: newBoardId,
//     }
//     $.ajax({
//       url: `/api/task/${data.id}`,
//       method: 'PUT',
//       data: JSON.stringify(data),
//       headers: {
//         Authorization: 'bearer ' + localStorage.token,
//         'content-type': 'application/json'
//       },
//       success: function (data) {
//         getTask(data);
//       }
//     })
//   });
// }

// function removeCard() {

//   $('#board').on("click", "#deleteCard", function (event) {
//     console.log(event);
//     event.preventDefault();
//     event.stopPropagation();
//     const button = $(event.target)
//     const form = button.parent().parent()
//     const data = {
//       title: form.find('.card-title').val(),
//       id: form.find('.cardId').val(),
//     }

//     $.ajax({
//       url: `/api/task/${data.id}`,
//       method: 'DELETE',
//       headers: {
//         Authorization: 'bearer ' + localStorage.token,
//         'content-type': 'application/json'
//       },
//       success: function (data) {
//         getTask();
//       }
//     })
//   });
// }

// function renderNewCard() {
//   $('.materialize-textarea').trigger('autoresize');

//   const taskObj = {
//     title: '',
//     description: '',
//     created: ''
//   }

//   $.ajax({
//     url: '/api/task/',
//     method: 'POST',
//     dataType: 'json',
//     data: JSON.stringify(taskObj),
//     headers: {
//       Authorization: 'bearer ' + localStorage.token,
//       'content-type': 'application/json'
//     },
//     success: function () {
//       STATE.taskId++
//       // $('#todo').append(generateNewCard({
//       //   taskId: STATE.taskId
//       // }));
//       getTask();
//     }
//   })
// }


// function handleNewCard() {
//   $('#add-new').on('click', function (event) {
//     event.preventDefault();
//     renderNewCard();
//   })
// }

// function init() {
//   initIt();
//   handleNewCard();
//   removeCard();
//   getTask();
// }

// $(init);