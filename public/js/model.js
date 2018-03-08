'use strict';

//this js file has our model for rendering html to the DOM dynamically

// ondrop="drop(event)" ondragover="allowDrop(event)"

function generateNewCard(task) {
    return `
<form>
    
  <div class="col s12 task" draggable="true" id="item${STATE.taskId}">
    <div class="card small blue-grey darken-1 myCard">
      <div class="card-content white-text">
        <input class="card-title" value="${task.title ? task.title : ''}" placeholder="Task" required/>
        <input type="hidden" value="${task.id ? task.id : ''}" class="cardId">
        <input type="hidden" value="${task.board ? task.board : ''}" class="cardBoard">

    
          <div class="input-field">
              <textarea  class="materialize-textarea cardDescription">${task.description ? task.description : ''}
              </textarea>
              <label class="active" for="textarea">Description</label>
          </div>
  
        
          </div>
        <div class="card-action">
          <button type="submit" id="save">Save</button>
          <button type="button" id="deleteCard">Delete</button>
        </div>
      </div>
    </div>
  </div>
  </form>
    `;
    console.log(task);
  }

  //signup

  function showSignup() {
    const content = `
    <section>
      <form id="signup-form" onsubmit="onSignUp(event)" method="post" class="sign-up">
        <h1 class="center-align">Sign Up</h1>
          <p class="center-align">Please fill in this form to create an account</p>
          <div class="userWarn"></div>
          <label for="name">First Name</label><br>
          <input id="firstName" type="text" placeholder="Enter first name" name="first-name" required><br>
          <label for="name">Last Name</label><br>
          <input id="lastName" type="text" placeholder="Enter last name" name="last-name" required><br>
          <label for="username">username</label><br>
          <input id="username-su" type="text" placeholder="Enter username" name="username" required><br>
          <label for="password">Password</label><br>
          <input id="password-su" type="password" placeholder="Enter password" name="password" required><br>
          <label for="password-repeat">Repeat Password</label><br>
          <input id="repeat-password-su"type="password" placeholder="Repeat password" name="password-repeat" required><br>
  
          <button type="button" class="cancel-btn btn">Cancel</button>
          <button type="submit" class="singup-btn btn">Sign Up</button>
          <p class="has-accnt">Already have an account? <a href="#" class="login-accnt">Log in</a></p>
    
      </form>
    </section>
    `
    $('main').html(content);
  };

  //login

  function showLogin() {
    const content = `
    <section>
      <form onsubmit="onLogin(event)" method="post" class="login">
        <h1 class="center-align">Login</h1>
        <div class="userWarn"></div>
        <label for="username">Username</label><br>
        <input type="text" name="username" id="usernameLogin" required><br>
        <label for="password">Password</label><br>
        <input type="password" name="password" id="passwordLogin" required><br>
        <div class="center-align">
        <button class="login btn center-align">login</button>
        </div>
        <p>demo user: ness</p>
        <p>demo password: earthbound</p>      
        <p class="no-accnt">Click <a href="#" class="create-accnt">here</a> to create an account.</p>
      </form>
    </section
    `
    $('main').html(content);
  };
