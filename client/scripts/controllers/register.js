Template.register.events({
	"submit #registerForm": function (event) {
		event.preventDefault();
		var username, email, pass, passConfirm;

		email = $("#registerEmail").val()
		pass = $("#registerPassword").val();
		username = $("#registerUsername").val();
		passConfirm = $("#registerPasswordConfirmation").val();
		
		if (pass == passConfirm) {
			Accounts.createUser({
				email: email,
				password: pass,
				profile: {
					name: username
				}
			}, function (Error) {
				if (Error) {
					console.log(Error);
				} else {
					Backbone.history.navigate("/");
				}
			});
		} else {
			alert("The passwords doesn't match!");
		}
	}
});
