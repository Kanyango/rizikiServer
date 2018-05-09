'use strict';
var mongoose = require('mongoose');
//var access  = require('./access');
//var redisClient = require('redis').createClient;
//var redis = redisClient(6379, 'localhost');
var config = require('./config');
var jwt = require('express-jwt');
var auth  = jwt({ secret : config.secret , userProperty: 'payload'});
var passport = require('./passport');
//var cache = require('express-redis-cache')();
//var cache = require('express-redis-cache')({ prefix: 'llabsApp' });

var order    = require('./server/service/order');
var product  = require('./server/service/product');
var trans    = require('./server/service/trans');
var user     = require('./server/service/users');
var dists     = require('./server/service/dists');
var prodimg     = require('./server/service/prod_img');

module.exports = function(app , passport)
{

    app.get('/order/:id',  order.single);
    app.post('/order/', auth , order.create);
    app.put('/order/:id' , order.update);
    app.get('/order/', auth , order.seller_read);
    app.get('/orders/', auth , order.read);
    
    app.get('/distributor/:id',  dists.single);
    app.post('/distributor/',   dists.create);
    app.put('/distributor/:id',  dists.update);
    app.get('/distributor/',  dists.read);
    app.delete('/distributor/',   dists.remove);

    app.delete('/product/:id', auth  ,  product.remove);
    app.put('/upload/:id', auth  ,  product.upload);
    app.post('/product', auth  , product.create);
    app.put('/product', auth , product.update);
    app.get('/product', auth  , product.read);
    
    app.post('/prodimage/' , prodimg.create);
    app.get('/prodimage/' , prodimg.read);
    app.get('/prodimage/:id', auth , prodimg.single);
    app.delete('/prodimage/' , prodimg.remove);
    
    app.get('/trans/:id'  ,  trans.single);
    app.post('/trans'  , trans.create);
    app.get('/trans'  , trans.read);

    app.post('/session/create' ,  user.create);
    app.post('/login' ,  user.login);
    app.post('/location' ,  user.location);
    app.put('/coverage', auth , user.coverage);
    app.get('/settings', auth , user.readProfile);



    app.get('/logout' , function(req , res){
    	req.logout();
    	res.redirect('/');
    });

    app.all('/*', function(req, res) {res.send('process ' + process.pid + ' says hello!').end();})
};
