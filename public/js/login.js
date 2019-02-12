$(document).ready(function () {
    const loginForm = $("form.login");
    const emailInput = $("input#email-input");
    const passwordInput = $("input#password-input");
    
  // When the form is submitted, we validate there's an email and password enteredP
  loginForm.on("submit", function (event) {
    event.preventDefault();
    const userData = {
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };
    if (!userData.email || !userData.password) {
        return false;
    }
    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.email, userData.password);
    emailInput.val('');
    passwordInput.val('');
    });
    
    // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(email, password) {
    $.post("/api/login", {
      email: email,
      password: password
    }).then(function (data) {
      window.location.replace(data);
      // If there's an error, log the error
    }).catch(function (err) {
      console.log(err);
    });
  }
})