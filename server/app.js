Items = new Meteor.Collection("items");
Groups = new Meteor.Collection("groups");

Meteor.publish("items", function () {
	return Items.find({});
});

Meteor.publish("users", function () {
	return Meteor.users.find({}, {
		fields: {
			"services": 1
		},
		transform: function (user) {
			user.profile.image = "http://graph.facebook.com/" + user.services.facebook.id + "/picture/?type=large";
			return user;
		}
	});
});

Meteor.publish("groups", function () {
	return Groups.find({});
});

Items.allow({
	insert: function (userId, doc) {
		check(doc.name, String);
		check(doc.price, Number);
		console.log(doc);
		return true;
	},
	update: function () {
		return true;
	},
	remove: function () {
		return true;
	}
});

Groups.allow({
	insert: function (userId, doc) {
		return true;
	},
	update: function (userId, doc) {
		return Meteor.user()._id === userId;
	},
	remove: function (userId, doc) {
		return Meteor.user()._id === userId;
	}
});
