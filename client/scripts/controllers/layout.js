Template.layout.userPicture = function () {
	return '';
	//return  (Meteor.user().services) ? getFacebookPicture(Meteor.user().services.facebook.id) : '';
};

Template.layout.currentGroup = function () {
	return Session.get("currentGroup");
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
