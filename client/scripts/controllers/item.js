Template.item.userName = function () {
	return Meteor.users.findOne({_id: this.user}).profile.name;
};

Template.item.userImage = function () {
	return Meteor.users.findOne({_id: this.user}).profile.image;
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
