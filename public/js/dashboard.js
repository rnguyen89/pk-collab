'use strict';  

function initIt(){

$('#item1, #item2').bind('dragstart', function(event) {
  event.originalEvent.dataTransfer.setData("text/plain", event.target.getAttribute('id'));
});

// bind the dragover event on the board sections
$('#todo, #inprogress, #done').bind('dragover', function(event) {
  event.preventDefault();
});

// bind the drop event on the board sections
$('#todo, #inprogress, #done').bind('drop', function(event) {
var notecard = event.originalEvent.dataTransfer.getData("text/plain");
event.target.appendChild(document.getElementById(notecard));
// Turn off the default behaviour
// without this, FF will try and go to a URL with your id's name
event.preventDefault();
});
}

function generateTodoItem() {
  return `
  
  `
}

function generateNewCard() {
    return `
    
    <div class="col s4">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text">
          <span class="card-title">Card Title</span>
          <p>I am a very simple card. I am good at containing small bits of information.
          I am convenient because I require little markup to use effectively.</p>
        </div>
        <div class="card-action">
          <a href="#">This is a link</a>
          <a href="#">This is a link</a>
        </div>
      </div>
    </div>
  `;


  }

  function renderNewCard() {
    $('.newCard').append(generateNewCard);
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
  }

  $(init);