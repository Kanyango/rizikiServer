'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{

	var catsSchema = new mongoose.Schema({
  
	dateCreated: {type: Date, default: Date.now()},
	cat_img: {type: String},
  cat_title: {type: String},
  sub_cats: []
 
	});
	app.db.model('Categories', catsSchema);
  
};
