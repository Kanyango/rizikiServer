
'use strict';

var mongoose = require('mongoose');
var multer = require('multer');
var fs = require('fs');
var path = require('path');
var apikey   = '12f34bba9ea25cae365b6dc1b92fba2e881ee332213923f91dcd18e4c47540e6';
var cloudinary = require('cloudinary');
const https = require('https');

var prodimg = {
  
create: function(req, res, next)
	{
		//var id = mongoose.Types.ObjectId(req.params.id);

		var storage = multer.diskStorage({
  // destination
		 /* destination: function (req, file, cb) {
		    cb(null, './uploads/')
		  },*/
		  filename: function (req, file, cb) {
		    cb(null, file.originalname);
		  }
		});

	var upload = multer({ //multer settings
                    storage: storage
                }).single('photo'); 



							            //var fieldsToSet = { img : {data : fs.readFileSync(req.file.path, "base64"), contentType : 'img/png' } };


	upload(req,res,function(err){
						            if(err){
						                res.json({error_code:1,err_desc:err});
						                return next(err);
						            }
						

												 var pathy = req.file.path;
												 cloudinary.config({
												 cloud_name: 'dxomvhu0p',
												 api_key: '811296612498678',
												 api_secret: 'j8BV1pcR-Jagxi63jCJSAMrImVM'
											 });
											 cloudinary.uploader.upload(pathy,
											 function(result) {
												  var fieldsToSet = {img_title: result.original_filename , img_url : result.secure_url };
													var options = { new: true };
			req.app.db.models.ProdImage.create(fieldsToSet, options, function(err , docs){
													if(err)
											    	{
											    		return next(err);
											    	}
														res.status(200).json(docs);
											 });

						        });
									});

	},
	read : function(req , res , next)
	{
		//var id = mongoose.Types.ObjectId(req.payload._id);
		
		req.app.db.models.ProdImage.find({},
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
		req.app.db.models.ProdImage.findById(id,
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},
	update : function(req , res , next)
	{
		console.log(req.body);
		 
		var id = mongoose.Types.ObjectId(req.params.id);
		var fieldsToSet =
		{
			category   : req.body.category,
			sub_category : req.body.sub_category,
			brand        : req.body.brand
		};

		var options = { new : true };

		req.app.db.models.ProdImage.findByIdAndUpdate(id , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  },
	remove : function(req , res , next)
	{
	  	req.app.db.models.ProdImage.findByIdAndRemove(req.params.id, 
	  		function(err , info){
	  			if(err)
	  			{
	  				return next(err);
	  			}
	  			res.status(200).json(info);
	  		});
	  }
}
module.exports = prodimg;
