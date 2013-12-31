Template.login.registerPage = function () {
	return Session.get("registerPage");
};

Template.login.events({
	"submit #loginForm": function (event) {
		event.preventDefault();

		Meteor.loginWithPassword($("#loginName").val(), $("#loginPassword").val(), function (Error) {
			if (Error) {
                console.log(Error.error + ": " + Error.reason + ". " + Error.description);
                alert(Error.reason);
            } else {
                Backbone.history.navigate("/");
            }
		});
	}
});
