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
