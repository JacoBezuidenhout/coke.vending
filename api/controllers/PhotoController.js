/**
 * PhotoController
 *
 * @description :: Server-side logic for managing photos
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var debug = false;
var fs = require('fs');
var archiver = require('archiver');
var dataPath = "/data/ownCloud/Documents/data.csv";
var reportPath = "/data/ownCloud/Documents/report.csv";
// var dataPath = "data.csv";
// var reportPath = "report.csv";
module.exports = {
	csv: function(req,res)
	{
  		res.download(reportPath); // Set disposition and send it.
	},
	
	data: function(req,res)
	{
  		res.download(dataPath); // Set disposition and send it.
	},
	
	photos: function(req,res)
	{
		var archive = archiver.create('zip', {});
		archive.pipe(res);

		archive.bulk([
		  { expand: true, cwd: '/data/ownCloud/', src: ['**/*'] }
		]);

		archive.finalize();
	},

	summary: function(req,res)
	{
		var obj = {};
		obj.server = true;
		obj.interface = false;
		obj.disk = false;
		obj.dataset = [];

		fs.readFile(reportPath, 'utf-8', function(err, data) {
	        if (err)
	        {
	        	if (debug) console.log(err);
	        }
	        else
	        {
	        	var lines = data.trim().split('\n');
	        	for (var i = 0; i < lines.length; i++) {
	        		lines[i] = lines[i].split(",");
	        	};
	        	obj.disk = true;
				obj.dataset = lines;
	        }

			return res.json(obj);
      	});

	}

};

