'use strict';

//see js/model.js for generating html function

//login

function onLogin(event) {
  event.preventDefault();
  const existingUser = {
    username: $('#usernameLogin').val(),
    password: $('#passwordLogin').val()
  }
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
    },
    error: userDuplicate
  })
}

function loginError() {
  $("body").on('submit', "#login-form", function(event) {
    event.preventDefault();
    let username = $('#usernameLogin').val();
    let password = $('#passwordLogin').val();
    
  });
}


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

function onSignUp(event) {
  event.preventDefault();
  const newUser = {
    firstName: $('#firstName').val(),
    lastName: $('#lastName').val(),
    username: $('#usernameLogin').val(),
    password: $('#passwordLogin').val()
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
      localStorage.setItem('token', data.authToken);
      onLogin();
    },
      error: userPassError
  })
}


function signupLink() {
  $('main').on('click', ".create-accnt", function (e) {
    e.preventDefault();
    showSignup();
  });
};

//logout

function onLogout() {
  
  $('.logout-btn').on("submit", event => {
    event.preventDefault();    
    localStorage.setItem('token', '');
    window.location = '/';
  });
}

//user errors

function hasWhiteSpace(string) {
  return string.indexOf(" ") >= 0;
}

function userPassError() {
  $("body").on('submit', "#signup-form", function(event) {
    event.preventDefault();
    let username = $('#usernameLogin').val();
    let password = $('#passwordLogin').val();
    let repeatPassword = $('#repeat-passwordLogin').val();
    

    if(password.length <= 7) {

      Materialize.toast('Password must be atleast 7 characters', 4000);
    } if(hasWhiteSpace(password) === true)  {
      Materialize.toast('Cannot contain spaces', 4000);
        
    } if(hasWhiteSpace(username) === true) {
      Materialize.toast('Cannot contain spaces', 4000);
      
    } if(password != repeatPassword) {
      Materialize.toast('Password must match', 4000);
      
    } 
    })
  }


function userDuplicate() {
  Materialize.toast('Please check username and password', 4000);
}


function ignition() {
  login();
  loginLink();
  signupLink();
  onLogout();
  $('.materialboxed').materialbox();
}

$(ignition);
