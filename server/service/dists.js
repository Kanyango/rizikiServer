
'use strict';
var mongoose = require('mongoose');


var dists = {

	create : function(req , res , next)
	{
		console.log(req);
		
		var fieldsToSet = 
		{

		      biz_name   :  req.body.biz_name,
		      biz_mail    : req.body.biz_mail,
		      biz_phone  : req.body.biz_phone,
		      biz_password  : req.body.biz_password
		};
		
		req.app.db.models.Distributor.create(fieldsToSet, 
			function(err ,  docs){

				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		var id = req.params.id;
		var fieldsToSet = 
		{
			biz_name   :  req.body.biz_name,
      biz_mail    : req.body.biz_mail,
      biz_phone  : req.body.biz_phone,
      biz_password  : req.body.biz_password
		};

		var options = { new : true };

		req.app.db.models.Distributor.findByIdAndUpdate(
			mongoose.Types.ObjectId(id) , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	read : function(req , res , next)
	{
		//var id = mongoose.Types.ObjectId(req.payload._id);
		
		req.app.db.models.Distributor.find({},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},

	single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Distributor.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	remove : function(req , res , next)
	{
	  	req.app.db.models.Distributor.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});
	  }
	  
}
module.exports = dists;
