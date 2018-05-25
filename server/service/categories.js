
'use strict';

var mongoose = require('mongoose');
var multer = require('multer');
var formidable = require('formidable');
//var upload = multer({dest: DIR}).single('photo');
//var DIR = './uploads/';
var apikey   = 'b08b2c77192e5dc068f327209015659596c3eb85cda37524729622dd0968d53e';
var cloudinary = require('cloudinary');

var cats = {

	create : function(req , res , next)
	{
		var fieldsToSet =
		{
			cat_title      : req.body.cat_title,
			sub_cats      : req.body.sub_cats,
		};

		req.app.db.models.Categories.create(fieldsToSet,
			function(err ,  docs){

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
		
		req.app.db.models.Categories.find({},
		    function(err , docs)
			{
				if(err)
				{
					return next(err);
				}
				res.status(200).json(docs);
			});
	},

	upload: function(req, res, next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);

		var storage = multer.diskStorage({
  // destination
		  /*destination: function (req, file, cb) {
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
						                 //res.json({error_code:1,err_desc:err});
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
												  var fieldsToSet = { cat_img : result.secure_url };
													var options = { new: true };
			req.app.db.models.Categories.findByIdAndUpdate(id, fieldsToSet, options, function(err , docs){
													if(err)
											    	{
											    		return next(err);
											    	}
														res.status(200).json(docs);
											 });

						        });
									});

	},
	single : function(req , res , next)
	{
		var id = mongoose.Types.ObjectId(req.params.id);
		req.app.db.models.Categories.findById(id,
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
			  cat_title: req.body.cat_title,
			  sub_cats: req.body.sub_cats
		};

		var options = { new : true };

		req.app.db.models.Categories.findByIdAndUpdate(id , fieldsToSet ,
			options , function(err , docs){
				if(err)
		    	{
		    		return next(err);
		    	}
			 res.status(200).json(docs);
			});
	  }

}
module.exports = cats;
