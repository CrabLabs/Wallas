Template.layout.noProfilePic = function () {
	return Meteor.user() && Meteor.user().profile && ((typeof Meteor.user().profile.image === "undefined") ? true : false);
};

Template.layout.currentGroup = function () {
	return Session.get("currentGroup");
};

Template.layout.events({
	"click .noProfilePic a": function (event) {
		event.preventDefault();

		var url = prompt("Enter the image URL (link)");

		if ($.trim(url) !== "") {
			Meteor.users.update({_id: Meteor.userId()}, {
				$set: {
					"profile.image": $.trim(url)
				}
			});
		}
	},
	"click #logout": function (event) {
		event.preventDefault();
		Meteor.logout();
	},
	"click #add-new": function (event) {
		event.preventDefault();

		var dialog = $("<form />").addClass("dialog");
		dialog.append("<input class='name' placeholder='Item name' autofocus>");
		dialog.append("<input class='price' placeholder='Item price'>");
		dialog.append("<input type='submit' id='send'>");
		$(dialog).appendTo("footer .interaction");

		$(document).on("submit", ".dialog", function (event) {
			event.preventDefault();
			var name = $(this).children("input.name").val();
			var price = $(this).children("input.price").val();
			if ($.trim(name) !== "" && $.trim(price) !== "") {
				Items.insert({
					user: Meteor.userId(),
					group: Session.get("currentGroup"),
					name: name,
					price: parseInt(price, 10)
				});

				$(".dialog").remove();
				$(document).off("submit", ".dialog");
			}
		});
	}
});
