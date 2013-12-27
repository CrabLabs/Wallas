Items = new Meteor.Collection("items");

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
