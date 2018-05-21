'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var productSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
	brand       : {type: String},
	//dist       : {type: mongoose.Schema.Types.ObjectId, ref: 'Distributor' },
	category   : String,
        sub_category: String,
	variations : []
	});
	app.db.model('Product', productSchema);
};
