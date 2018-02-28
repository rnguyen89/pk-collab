'use strict';

function onLogin(event) {
  event.preventDefault();
  const existingUser = {
    username: $('#usernameLogin').val(),
    password: $('#passwordLogin').val()
  }
  console.log(existingUser);
  $.ajax({
    url: '/api/auth/login',
    dataType: 'json',
    headers: {
      Authorization: "basic " + btoa( `${existingUser.username}:${existingUser.password}`)
    },
    method: 'POST',
    data: JSON.stringify(existingUser),
    contentType: 'application/json',
    success: function(data) {
      console.log(data)
      localStorage.setItem("token", data.authToken);
      window.location = "/dashboard.html";
    }
  })
}

// function userErr() {
//   $('.userWarn').html('Username does not exist');
// }


// login

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

function login() {
  $('.start-button').on('click', function (e) {
    e.preventDefault();
    showLogin();
  });
};

function loginLink() {
  $('main').on('click', ".login-accnt", function (e) {
    e.preventDefault();
    showLogin();
  });
};

function onSignUp(event) {
  event.preventDefault();
  const newUser = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    username: $('#username-su').val(),
    password: $('#password-su').val()
  }
  console.log(newUser);
  $.ajax({
    url: '/api/user/',
    dataType: 'json',
    method: 'POST',
    data: JSON.stringify(newUser),
    contentType: 'application/json',
    success: function(data) {
      console.log(data)
      localStorage.setItem("token", data.authToken);
      window.location = "/dashboard.html";
    }
  })
}

// function duplicateUser() {
//   $('.userWarn').html('Username is already taken');
// }

//signup
function showSignup() {
  const content = `
  <section>
    <form onsubmit="onSignUp(event)" method="post" class="sign-up">
    <div class="userWarn"><div>
      <h1 class="center-align">Sign Up</h1>
        <p class="center-align">Please fill in this form to create an account</p>
        <label for="name">First Name</label><br>
        <input id="firstName" type="text" placeholder="Enter first name" name="first-name" required><br>
        <label for="name">Last Name</label><br>
        <input id="lastName" type="text" placeholder="Enter last name" name="last-name" required><br>
        <label for="username">username</label><br>
        <input id="username-su" type="text" placeholder="Enter username" name="username" required><br>
        <label for="password">Password</label><br>
        <input id="password-su" type="password" placeholder="Enter password" name="password" required><br>
        <label for="password-repeat">Repeat Password</label><br>
        <input type="password" placeholder="Repeat password" name="password-repeat" required><br>

        <button type="button" class="cancel-btn btn">Cancel</button>
        <button type="submit" class="singup-btn btn">Sign Up</button>
        <p class="has-accnt">Already have an account? <a href="#" class="login-accnt">Log in</a></p>
  
    </form>
  </section>
  `
  $('main').html(content);
};

function signupLink() {
  $('main').on('click', ".create-accnt", function (e) {
    e.preventDefault();
    showSignup();
  });
};

function ignition() {
  login();
  loginLink();
  signupLink();
}

$(ignition);
