

'use strict';

module.exports = function(app , mongoose){

	var prodImageSchema = new mongoose.Schema({

       //user       : {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
		dateCreated : {type : Date,default: Date.now()},
		img_title 			: {type: String},
    img_url        	: {type: String},
		
	});
	app.db.model('ProdImage' , prodImageSchema);
};
