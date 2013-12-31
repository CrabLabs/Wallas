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

var getFacebookPicture = function (facebookId) {
	return "http://graph.facebook.com/" + facebookId + "/picture/?type=square";
};

Accounts.config({
	sendVerificationEmail: false
});
