'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var productSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	//owner      : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	brand      : String,
	dist       : {type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
	category   : String,
	variations : []
	});
	app.db.model('Product', productSchema);
};
