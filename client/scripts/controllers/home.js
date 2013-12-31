Template.home.noItems = function () {
	return Items.find({ group: Session.get("currentGroup") }).count() === 0;
};

Template.home.items = function () {
	return Items.find({
		group: Session.get("currentGroup")
	});
};

Template.home.total = function () {
	var total = 0;
	
	Items.find({
		group: Session.get("currentGroup")
	}).map(function(doc) {
		total += doc.price;
	});
	return total;
};

Template.home.rendered = function () {
	$(".items .profilePic").each(function () {
		var $self = $(this);
		var colors = RGBaster.colors($(this)[0], function (payload) {
			// payload.dominant
			$self.parent().parent().css("background-color", payload.dominant);
		});
	});
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
