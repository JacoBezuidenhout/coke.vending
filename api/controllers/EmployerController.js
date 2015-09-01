/**
 * EmployerController
 *
 * @description :: Server-side logic for managing employers
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var fs = require('fs');
var json2xls = require('json2xls');

var Converter = require("csvtojson").Converter;
var fileStream = fs.createReadStream("./scripts/employers.csv");
var converter = new Converter({constructResult:true});

module.exports = {
	tocsv : function (req, res) {
		Employer.find({},function(err,data){
			var xls = json2xls(data);
			res.setHeader('Content-Length', xls.length);
			res.write(xls, 'binary');
			res.end();
		});
  	},
	import : function (req, res) {
		fileStream.pipe(converter);
		converter.on("end_parsed", function (jsonObj) {
			// Employer.find({},function(err,data){
			// 		var xls = json2xls(data);
			// 		res.setHeader('Content-Length', xls.length);
			// 		res.write(xls, 'binary');
			// 		res.end();
			// 	});

			for (var i = 0; i < jsonObj.length; i++) {
				var tmp = JSON.parse(JSON.stringify(jsonObj[i].streetAddress)).split("  ");
				jsonObj[i].streetAddress = {};
				jsonObj[i].streetAddress.a = tmp[0];
				jsonObj[i].streetAddress.b = tmp[1];
				jsonObj[i].streetAddress.c = tmp[2];

				tmp = JSON.parse(JSON.stringify(jsonObj[i].postalAddress)).split("  ");
				jsonObj[i].postalAddress = {};
				jsonObj[i].postalAddress.a = tmp[0];
				jsonObj[i].postalAddress.b = tmp[1];
				jsonObj[i].postalAddress.c = tmp[2];
		  
				if (jsonObj[i].email == '') delete jsonObj[i].email;
				if (jsonObj[i].addressHeadOffice == '') delete jsonObj[i].addressHeadOffice;
				
				if (jsonObj[i].tel == '') delete jsonObj[i].tel;
				  	else 
				  	{
				  		if (typeof jsonObj[i].tel !== undefined)
				  		{
				  			try
				  			{
				  				jsonObj[i].tel = jsonObj[i].tel.replace(' ','').replace(' ','').replace('-','').replace('(','').replace(')','').replace(',','').replace(',','');
				  			}
				  			catch(e)
				  			{

				  			}
				  		}
					}

				if (jsonObj[i].cell == '') delete jsonObj[i].cell;
				  	else 
				  	{
				  		if (typeof jsonObj[i].cell !== undefined)
				  		{
				  			try
				  			{
				  				jsonObj[i].cell = jsonObj[i].cell.replace(' ','').replace(' ','').replace('-','').replace('(','').replace(')','').replace(',','').replace(',','');
				  			}
				  			catch(e)
				  			{

				  			}
				  		}
					}

				if (jsonObj[i].fax == '') delete jsonObj[i].fax;
				  	else 
				  	{
				  		if (typeof jsonObj[i].fax !== undefined)
				  		{
				  			try
				  			{
				  				jsonObj[i].fax = jsonObj[i].fax.replace(' ','').replace(' ','').replace('-','').replace('(','').replace(')','').replace(',','').replace(',','');
				  			}
				  			catch(e)
				  			{

				  			}
				  		}
					}

				if (jsonObj[i].businessType == '') delete jsonObj[i].businessType;
				  	else 
				  	{
				  		if (typeof jsonObj[i].fax !== undefined)
				  		{
				  			try
				  			{
				  				if (jsonObj[i].businessType == "REST" ) jsonObj[i].businessType = "restaurant";
				  				if (jsonObj[i].businessType == "SH" ) jsonObj[i].businessType = "steakhouse";
				  				if (jsonObj[i].businessType == "RH" ) jsonObj[i].businessType = "roadhouse";
				  				if (jsonObj[i].businessType == "CAFE" ) jsonObj[i].businessType = "cafe";
				  				if (jsonObj[i].businessType == "FISH" ) jsonObj[i].businessType = "fishChips";
				  				if (jsonObj[i].businessType == "SNACK" ) jsonObj[i].businessType = "takeAway";
				  				if (jsonObj[i].businessType == "FUNC" ) jsonObj[i].businessType = "function";
				  				if (jsonObj[i].businessType == "OTHER" ) jsonObj[i].businessType = "other";
				  				if (jsonObj[i].businessType == -1 ) delete jsonObj[i].businessType;
				  			}
				  			catch(e)
				  			{

				  			}
				  		}
					}

				delete jsonObj[i].id;
				if (jsonObj[i].registeredNum == '') delete jsonObj[i].registeredNum;
				if (jsonObj[i].vatNum == '') delete jsonObj[i].vatNum;
				if (jsonObj[i].Contact == '') delete jsonObj[i]['Contact Person'];
				if (jsonObj[i].registeredName == '') delete jsonObj[i].registeredName;
				if (jsonObj[i].commencementDate == '') delete jsonObj[i].commencementDate;
				if (jsonObj[i].statusId == '') delete jsonObj[i].statusId;
				if (jsonObj[i].comment == '') delete jsonObj[i].comment;

			};

			Employer.create(jsonObj).exec(function createCB(err, created){
			  console.log(created);
			});

			console.log("Sending JSON");
			res.set('Content-Type', 'text/json');
			res.send(jsonObj);
		});
  	}
};

