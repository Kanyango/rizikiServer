'use strict';

module.exports = function(app , mongoose)
{
	require('./server/schema/users')(app , mongoose);
	require('./server/schema/order')(app , mongoose);
	require('./server/schema/trans')(app , mongoose);
	require('./server/schema/products')(app , mongoose);
	require('./server/schema/dists')(app , mongoose);
	require('./server/schema/prod_images')(app , mongoose);
	require('./server/schema/adverts')(app , mongoose);
};
