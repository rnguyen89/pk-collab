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
    }
  })
}

// function userErr() {
//   $('.userWarn').html('Username does not exist');
// }



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
      localStorage.setItem('token', data.authToken);
      window.location = '/dashboard.html';
    }
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
  
  $('#logout').on("submit", event => {
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
    let username = $('#username-su').val();
    let password = $('#password-su').val();
    let repeatPassword = $('#repeat-password-su').val();
    

    if(password.length < 7) {
      $('.userWarn').append('Password must be atleast 7 characters');
    } else if(hasWhiteSpace(password) === true)  {
      $('.userWarn').append('Cannot contain spaces');  
    } else if(hasWhiteSpace(username) === true) {
      $('.userWarn').append('Cannot contain spaces');
    } else if(password != repeatPassword) {
      $('.userWarn').append('Password must match');
      
    }
    })
  }


function userDuplicate() {
  $(".userWarn").append(" Username already taken");
}


function ignition() {
  login();
  loginLink();
  signupLink();
  userPassError();
  onLogout();
}

$(ignition);
