Template.dashboard.groups = function () {
	return Groups.find({
		deleted: false
	});
};

Template.dashboard.events({
	"click .groupAdd": function (event) {
		event.preventDefault();
		
		var dialog = $("<form />").addClass("dialog");
		dialog.append("<input placeholder='Group name' autofocus>").append("<input type='submit'>");
		$(dialog).appendTo("#dashboard .interaction");

		$(document).on("submit", ".dialog", function (event) {
			event.preventDefault();
			var name = $(this).children("input").val();
			
			if ($.trim(name) !== "") {
				Groups.insert({
					deleted: false,
					owner: Meteor.user()._id,
					name: name
				});

				$(".dialog").remove();	
			}
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
