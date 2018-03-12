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


'use strict';
const STATE = {
  taskId: 0,
  total: 0,
  points: 0,
  tasks: []
}

function allowDrop(event) {
  event.preventDefault();
}

function drag(event) {
  event.dataTransfer.setData("text", event.target.id);
}

function drop(event) {
  event.preventDefault();
  var data = event.dataTransfer.getData("text");
  event.target.appendChild(document.getElementById(data));
}

function getTask() {
  const options = {
    url: '/api/task/',
    dataType: 'json',
    type: 'GET',
    headers: {
      Authorization: 'Bearer ' + localStorage.token
    },
    success: function (tasks) {
      STATE.tasks = tasks
      $('#todo').html('');
      $('#inProgress').html('');
      $('#done').html('');
      console.log(tasks);
      const todo = STATE.tasks.filter(task => {
        if (task.board === 'todo') {
          return true;
        }
      })
      const inProgress = STATE.tasks.filter(task => {
        if (task.board === 'inProgress') {
          return true;
        }
      })
      const done = STATE.tasks.filter(task => {
        if (task.board === 'done') {
          return true;
        }
      })
      
      STATE.total = 0
      STATE.points = 0

      todo.forEach(task => {
        STATE.total += task.points
        $('#todo').append(generateNewCard(task));
      })
      inProgress.forEach(task => {
        STATE.total += task.points
        $('#inProgress').append(generateNewCard(task));
      })
      done.forEach(task => {
        STATE.points += task.points
        STATE.total += task.points
        $('#done').append(generateNewCard(task));
      })
      $('.progress').html(`
      <div class="determinate" style="width: ${STATE.total ? (STATE.points/STATE.total)*100 : 100}%"></div>

      `)
      $('.total-points').html(`
        <p class="points-style">Total points = ${STATE.points + '/' + STATE.total}</p>
      `)
    }
  };

  $.ajax(options);
}

function initIt() {

  $('#board').on('dragstart', '.task', function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
    drag();
  });

  $('#board').on('submit', 'form', function (event) {
    event.preventDefault();
    console.log(event);
    const form = $(event.target)
    const data = {
      title: form.find('.card-title').val(),
      id: form.find('.cardId').val(),
      board: form.find('.cardBoard').val(),
      title: form.find('.card-title').val(),
      points: form.find('.card-points').val(),
      description: form.find('.cardDescription').val(),
    }
    let url = '/api/task/'
    let method = 'POST'
    if (data.id) {
      url += data.id
      method = 'PUT'
    }
    $.ajax({
      url: url,
      method: method,
      dataType: 'json',
      data: JSON.stringify(data),
      headers: {
        Authorization: 'bearer ' + localStorage.token,
        'content-type': 'application/json'
      },
      success: function () {
        STATE.taskId++
        getTask();
      }
    })
  });

  $('#todo, #inProgress, #done').bind('dragover', function (event) {
    event.preventDefault();
    drag();
  });

  $('#todo, #inProgress, #done').bind('drop', function (event) {
    console.log(event);
    event.preventDefault();
    const newBoardId = event.currentTarget.id;
    var notecard = event.originalEvent.dataTransfer.getData("text/plain");
    // event.currentTarget.appendChild(document.getElementById(notecard));
    
    console.log(notecard);
    const button = $(event.target)
    const form = button.parent().parent()
    const data = {
      id: form.find('.cardId').val(),
      board: newBoardId,
    }
    $.ajax({
      url: `/api/task/${data.id}`,
      method: 'PUT',
      data: JSON.stringify(data),
      headers: {
        Authorization: 'bearer ' + localStorage.token,
        'content-type': 'application/json'
      },
      success: function (data) {
        getTask(data);
      }
    })
  });
}

function removeCard() {

  $('#board').on("click", "#deleteCard", function (event) {
    console.log(event);
    event.preventDefault();
    event.stopPropagation();
    const button = $(event.target)
    const form = button.parent().parent()
    const data = {
      title: form.find('.card-title').val(),
      id: form.find('.cardId').val(),
    }

    $.ajax({
      url: `/api/task/${data.id}`,
      method: 'DELETE',
      headers: {
        Authorization: 'bearer ' + localStorage.token,
        'content-type': 'application/json'
      },
      success: function (data) {
        getTask();
      }
    })
  });
}

function renderNewCard() {
  $('.materialize-textarea').trigger('autoresize');

  const taskObj = {
    title: '',
    description: '',
    created: ''
  }

  $.ajax({
    url: '/api/task/',
    method: 'POST',
    dataType: 'json',
    data: JSON.stringify(taskObj),
    headers: {
      Authorization: 'bearer ' + localStorage.token,
      'content-type': 'application/json'
    },
    success: function () {
      STATE.taskId++
      // $('#todo').append(generateNewCard({
      //   taskId: STATE.taskId
      // }));
      getTask();
    }
  })
}


function handleNewCard() {
  $('#add-new').on('click', function (event) {
    event.preventDefault();
    renderNewCard();
  })
}

function init() {
  initIt();
  handleNewCard();
  removeCard();
  getTask();
}

$(init);