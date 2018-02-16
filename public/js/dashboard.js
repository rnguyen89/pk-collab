'use strict';  
const state = {
  taskId: 0
}

function initIt(){

$('#board').on('dragstart', '.task', function(event) {
  event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
});

// bind the dragover event on the board sections
$('#todo, #inprogress, #done').bind('dragover', function(event) {
  event.preventDefault();
});

// bind the drop event on the board sections
$('#todo, #inprogress, #done').bind('drop', function(event) {
var notecard = event.originalEvent.dataTransfer.getData("text/plain");
event.currentTarget.appendChild(document.getElementById(notecard));
// Turn off the default behaviour
// without this, FF will try and go to a URL with your id's name
event.preventDefault();
});
}

function generateTodoItem() {
  return `
  <div class="task" draggable="true">
  <div class="cardTitle">
              new item
          </div>
  </div>
  `
}

function renderTodoItem() {
  $('#todo').append(generateTodoItem);
}

function addTodoItem() {
  $('.addItem').on('click', function(e) {
    e.preventDefault();
    renderTodoItem();
  })
}

function generateNewCard() {
    return `
    
    <div class="col s12 task" id="item${state.taskId}" draggable="true">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <input class="card-title">
          Card Title</input>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">edit</a>
          <a href="#">delete</a>
        </div>
      </div>
    </div>
  `;
  }

  function renderNewCard() {
    state.taskId++
    $('#todo').append(generateNewCard);

  }

  
  function addCard() {
    $('.add-new').on('click', function(e) {
      e.preventDefault();
      renderNewCard();

    }) 
  }

  function init() {
    addCard();
    initIt();
    addTodoItem();
  }

  $(init);