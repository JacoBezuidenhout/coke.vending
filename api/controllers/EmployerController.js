/**
 * EmployerController
 *
 * @description :: Server-side logic for managing employers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var json2xls = require('json2xls');

module.exports = {
	tocsv : function (req, res) {
		Employer.find({},function(err,data){
			var xls = json2xls(data);
			res.setHeader('Content-Length', xls.length);
			res.write(xls, 'binary');
			res.end();
		});
  	}
};

