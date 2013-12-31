Template.layout.userPicture = function () {
	return '';
	//return  (Meteor.user().services) ? getFacebookPicture(Meteor.user().services.facebook.id) : '';
};

Template.layout.currentGroup = function () {
	return Session.get("currentGroup");
};

Template.layout.events({
	"dblclick .profilePic": function () {
		Meteor.users.update({_id: Meteor.userId()}, {
			$set: {
				"profile.image": prompt("Picture URL")
			}
		});
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
		dialog.append("<input type='submit'>");
		$(dialog).appendTo("footer .interaction");

		$(document).on("submit", ".dialog", function (event) {
			event.preventDefault();
			var name = $(this).children("input.name").val();
			var price = $(this).children("input.price").val();
			if ($.trim(name) !== "" && $.trim(price) !== "") {
				Items.insert({
					user: Meteor.user(),
					group: Session.get("currentGroup"),
					name: name,
					price: parseInt(price, 10)
				});

				$(".dialog").remove();
			}
		});
	}
});
