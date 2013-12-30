Deps.autorun(function () {
	Meteor.subscribe("items");
	Meteor.subscribe("users");
	Meteor.subscribe("groups");
	Meteor.subscribe("currentGroup", Session.get("currentGroup"));
	Meteor.subscribe("registerPage", Session.get("registerPage"));
});

Items = new Meteor.Collection("items");
Groups = new Meteor.Collection("groups");

function getUserName (userId) {
	return Meteor.users.findOne({_id: userId}).profile.name;
};

function getUserPicture (userId) {
	var a = Meteor.call("getProfile", userId);
	console.log(a);
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

Template.home.items = function () {
	return Items.find({
		group: Session.get("currentGroup")
	});
};

Template.home.total = function () {
	var total = 0;
	
	Items.find({
		group: Session.get("currentGroup")
	}).map(function(doc) {
		total += doc.price;
	});
	return total;
};

Template.dashboard.groups = function () {
	return Groups.find({
		deleted: false
	});
};

Template.dashboard.events({
	"click .groupAdd": function (event) {
		event.preventDefault();
		
		Groups.insert({
			deleted: false,
			owner: Meteor.user()._id,
			name: prompt("Group name...")
		});
	},
	"click .remove": function (event) {
		event.preventDefault();
		
		if (confirm("Are you sure?")) {
			Groups.update({
				_id: this._id
			}, {
				$set: {deleted: true}
			});
		}
	}
});

Template.home.events({
	"click .remove": function (event) {
		event.preventDefault();
		
		if (confirm("Are you sure?")) {
			Items.remove({
				_id: this._id
			});	
		}
	}
});

var getFacebookPicture = function (facebookId) {
	return "http://graph.facebook.com/" + facebookId + "/picture/?type=square";
};

Template.layout.userPicture = function () {
	return  (Meteor.user().services) ? getFacebookPicture(Meteor.user().services.facebook.id) : '';
};

Template.layout.currentGroup = function () {
	return Session.get("currentGroup");
};

Template.login.registerPage = function () {
	return Session.get("registerPage");
};

Template.layout.events({
	"click #logout": function (event) {
		event.preventDefault();
		Meteor.logout();
	},
	"click #add-new": function (event) {
		event.preventDefault();

		Items.insert({
			user: Meteor.user(),
			group: Session.get("currentGroup"),
			name: prompt("Item name"),
			price: parseInt(prompt("Item price"), 10)
		});
	}
});

Template.home.rendered = function () {
	$(".items .profilePic").each(function () {
		var $self = $(this);
		var colors = RGBaster.colors($(this)[0], function (payload) {
			// payload.dominant
			$self.parent().parent().css("background-color", payload.dominant);
		});
	});
};

Template.item.events({
	"dblclick .name": function () {
		Items.update({_id: this._id}, {
			$set: {name: prompt("Item name")}
		});
	},
	"dblclick .price": function () {
		Items.update({_id: this._id}, {
			$set: {price: parseInt(prompt("Item price"), 10)}
		});
	}
});

Accounts.config({
	sendVerificationEmail: false
});
