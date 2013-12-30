var Routes = Backbone.Router.extend({

	routes: {
		"": "dashbord",
		":id": "group",
		"register": "register"
	},

	dashbord: function () {
		Session.set("currentGroup", null);
		Session.set("currentRegistration", null);
	},

	group: function (id) {
		Session.set("currentRegistration", null);
		Session.set("currentGroup", id);
	},

	register: function () {
		Session.set("currentRegistration", true);
	}

});

new Routes;
Backbone.history.start({
	pushState: true
});

$(document).on("click", "a", function (event) {
	event.preventDefault();
	var href;
	href = $(this).attr("href");
	Backbone.history.navigate(href, {
		trigger: true
	});
});
