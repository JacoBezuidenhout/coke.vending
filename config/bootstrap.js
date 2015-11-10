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
  var exec = require('child_process').exec;
  sails.on('lifted', function() {

  	console.log("SAILS LIFTED");
    var peerServer = PeerServer({port: 9000, path: '/'},function(server) {
      console.log("peerServer Started");
      var goToHD = exec('xrandr --output HDMI2 --primary --mode 1920x1080', function(err, stdout, stderr) {
        if (err) console.log(err);
          else console.log("HD Set");

        server.on('connection', function(id) { 
          console.log("connected");
        });

        setTimeout(function(){
          var nw = exec('nw vending.frontend > /dev/zero', function(err, stdout, stderr) {
            if (err) console.log(err);
              else console.log("Interface Closed");
          });
        },2000);
      });
    });
  });
  	
  cb();
};
