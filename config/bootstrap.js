/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#!/documentation/reference/sails.config/sails.config.bootstrap.html
 */

module.exports.bootstrap = function(cb) {

  // It's very important to trigger this callback method when you are finished
  // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

 //  	require('sails-apidocs')({
 //        template: process.cwd() + '/node_modules/sails-apidocs/views/template.jade',
 //        targetDir: process.cwd() + '/assets/docs/api'
	// });
	var PeerServer = require('peer').PeerServer;
	var peerServer = PeerServer({port: 9000, path: '/'});
  	peerServer.on('connection', function(id) { 
  		console.log(id,"connected");
  	});
	
  	
  	cb();
};
