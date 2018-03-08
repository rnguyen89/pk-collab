'use strict';
const STATE = {
  taskId: 0,
  tasks: []
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
      $('#inprogress').html('');
      $('#done').html('');
      console.log(tasks);
      const todo = STATE.tasks.filter(task => {
        if(task.board === 'todo') {
          return true;
        }
      })
      const inprogress = STATE.tasks.filter(task => {
        if(task.board === 'inprogress') {
          return true;
        }
      })
      const done = STATE.tasks.filter(task => {
        if(task.board === 'done') {
          return true;
        }
      })
                
      todo.forEach(task => {
        $('#todo').append(generateNewCard(task));
      })
      inprogress.forEach(task => {
        $('#inprogress').append(generateNewCard(task));
      })
      done.forEach(task => {
        $('#done').append(generateNewCard(task));
      })
    }
  };

  $.ajax(options);
}

// function saveTask(taskId) {

//   const task = STATE.tasks.find(task => {
//     return task.id === taskId
//   })
//   $.ajax({
//     type: 'PUT',
//     dataType: 'json',
//     url: `/api/task/${data.id}`,
//     headers: { "content-type": "application/json" },
//     data: JSON.stringify(task)
//   });
// }

function initIt() {

  $('#board').on('dragstart', '.task', function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
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
      description: form.find('.cardDescription').val(),
    }
    let url = '/api/task/'
    let method = 'POST'
    if(data.id) {
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
      }
    })
  });

  $('#todo, #inprogress, #done').bind('dragover', function (event) {
    event.preventDefault();
  });

  $('#todo, #inprogress, #done').bind('drop', function (event) {
    console.log(event);
    const newBoardId = event.currentTarget.id;
    var notecard = event.originalEvent.dataTransfer.getData("text/plain");
    event.currentTarget.appendChild(document.getElementById(notecard));
    event.preventDefault();
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
      success: function(data) {
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
      success: function(data) {
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
      $('#todo').append(generateNewCard({
        taskId: STATE.taskId
      }));
    }
  })
}


function handleNewCard() {
  $('#add-new').on('click', function(event) {
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