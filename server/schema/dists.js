

'use strict';

var mongoose = require('mongoose');

module.exports = function(app , mongoose)
{
	var distSchema = new mongoose.Schema({

      dateCreated: {type: Date, default: Date.now()},
      biz_name      : {type: String},
      biz_mail      : {type: String},
      biz_phone     : {type: String},
      biz_password  : {type: String},
      coverage      : []
 
	});
	app.db.model('Distributor', distSchema);
};
