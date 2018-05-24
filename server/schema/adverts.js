
'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var advertsSchema = new mongoose.Schema({

	dateCreated: {type: Date, default: Date.now()},
	title      : {type: String},
  status     : {type: String},
  owner      : {type: String},
  cost       : {type: String},
  position   : {type: String},
  photo      : {type: String},
  start_date : {type: String},
  end_date   : {type: String}
 
	});
	app.db.model('Adverts', advertsSchema);
};
