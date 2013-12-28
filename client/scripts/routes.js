var Routes = Backbone.Router.extend({

	routes: {
		"": "dashbord",
		":id": "group"
	},

	dashbord: function () {
		Session.set("currentGroup", null);
	},

	group: function (id) {
		Session.set("currentGroup", id);
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
