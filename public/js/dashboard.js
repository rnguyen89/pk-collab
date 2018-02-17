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

function generateNewCard() {
  return `
  <div class="row">
    <form class="col s12">
      <div class="row">
        <div class="input-field col s12">
          <textarea id="textarea1" class="materialize-textarea"></textarea>
          <label for="textarea1">Textarea</label>
        </div>
      </div>
    </form>
  </div>

`;
}
$('#textarea1').val('New Text');
$('#textarea1').trigger('autoresize');

function generateNewCard() {
    return `
    <div class="col s12 task" id="item${state.taskId}" draggable="true">
    <div class="card blue-grey darken-1 myCard">
      <div class="card-content white-text">
        <input class="card-title" placeholder="Card Title" />
      </div>

      <div class="row">
      <form class="col s12">
        <div class="row">
          <div class="input-field col s12">
            <textarea id="textarea${state.taskId}" class="materialize-textarea"></textarea>
            <label for="textarea${state.taskId}">Tasks</label>
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
    $('#board').on("click", ".deleteCard" , function() {
      $(this).closest('.task').remove();
    });  
  }


  function renderNewCard() {
    state.taskId++
    $('#todo').append(generateNewCard);
    
    $('.materialize-textarea').trigger('autoresize');
    
  }

  
  function handleNewCard() {
    $('.add-new').on('click', function(e) {
      e.preventDefault();
      renderNewCard();
    }) 
  }

  function init() {
    initIt();
    handleNewCard();
    removeCard();
  }

  $(init);