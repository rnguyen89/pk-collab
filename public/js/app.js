'use strict';

// login

function showLogin() {
  const content = `
  <section>
    <form action="dashboard.html" class="login">
      <h1>Login</h1>
      <label for="username">Username</label><br>
      <input type="text" name="username" required><br>
      <label for="password">Password</label><br>
      <input type="password" name="password" required><br>
      <button class="login btn">login</button>
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

//signup
function showSignup() {
  const content = `
  <section>
    <form action="dashboard.html" class="sign-up">
      <h1>Sign Up</h1>
        <p>Please fill in this form to create an account</p>
        <label for="name">First Name</label><br>
        <input type="text" placeholder="Enter first name" name="first-name" required><br>
        <label for="name">Last Name</label><br>
        <input type="text" placeholder="Enter last name" name="last-name" required><br>
        <label for="username">username</label><br>
        <input type="text" placeholder="Enter username" name="username" required><br>
        <label for="password">Password</label><br>
        <input type="password" placeholder="Enter password" name="password" required><br>
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
