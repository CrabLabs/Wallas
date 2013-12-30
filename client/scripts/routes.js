var Routes = Backbone.Router.extend({

	routes: {
		"": "dashbord",
		"register": "register",
		":id": "group"
	},

	dashbord: function () {
		Session.set("registerPage", null);
		Session.set("currentGroup", null);
	},

	group: function (id) {
		Session.set("registerPage", null);
		Session.set("currentGroup", id);
	},

	register: function () {
		Session.set("registerPage", true);
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
