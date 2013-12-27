Deps.autorun(function () {
	Meteor.subscribe("items");
	Meteor.subscribe("users");
});

Items = new Meteor.Collection("items");

function getUserName (userId) {
	return Meteor.users.findOne({_id: userId}).profile.name;
};

function getUserPicture (userId) {
	var a = Meteor.call("getProfile", userId);
	console.log(a);
};


Template.home.items = function () {
	return Items.find({});
};

Template.home.total = function () {
	var total = 0;
	var as =  Items.find({}).map(function(doc) {
		total += doc.price;
	});
	return total;
};

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

Template.layout.userPicture = function () {
	return "http://graph.facebook.com/" + Meteor.user().services.facebook.id + "/picture/?type=square"
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
