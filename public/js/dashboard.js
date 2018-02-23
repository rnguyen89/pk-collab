'use strict';
const state = {
  taskId: 0,
  tasks: []
}

function getTask() {
  const url = 'http://localhost:8080/task'

  const options = {
    url: url,
    dataType: 'json',
    type: 'GET',
    success: function(tasks) {
      state.tasks = tasks
      state.tasks.forEach(task => {
      $('#todo').append(generateNewCard(task));
      })
    }
  };

  $.ajax(options);
}

// function getPost() {
//   const url = 'http://localhost:8080/'

//   const options = {
//     url: url,
//     dataType: 'json',
//     type: 'POST',
//     success: callbackTrailer
//   };

//   $.ajax(options);
// }



function initIt() {

  $('#board').on('dragstart', '.task', function (event) {
    event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
  });

  $('#todo, #inprogress, #done').bind('dragover', function (event) {
    event.preventDefault();
  });

  $('#todo, #inprogress, #done').bind('drop', function (event) {
    var notecard = event.originalEvent.dataTransfer.getData("text/plain");
    event.currentTarget.appendChild(document.getElementById(notecard));
    event.preventDefault();
  });
}


function generateNewCard(task) {
  return `
    <div class="col s12 task" id="item${state.taskId}" draggable="true">
    <div class="card small blue-grey darken-1 myCard">
      <div class="card-content white-text">
        <input class="card-title" placeholder="Task" />
      </div>

      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea${state.taskId}" class="materialize-textarea">
            ${task.description}</textarea>
            <label for="textarea${state.taskId}">Description</label>
          </div>
        </div>
      </form>
    </div>

      <div class="card-action">
        <a href="#" class="editCard">edit</a>
        <a href="#" class="deleteCard">delete</a>
      </div>
    </div>
  </div>
</div>
  `;
}

function removeCard() {
  $('#board').on("click", ".deleteCard", function () {
    $(this).closest('.task').remove();
  });
}


function renderNewCard() {
  state.taskId++
  $('#todo').append(generateNewCard({
    taskId: state.taskId
  }));
  $('.materialize-textarea').trigger('autoresize');
}


function handleNewCard() {
  $('.add-new').on('click', function (e) {
    e.preventDefault();
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