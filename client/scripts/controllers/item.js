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
