/**
* Order.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
		@teamName => Name of the team : string
		@smileyOne => $PRODUCT_OBJ$ : JSON
		@smileyTwo => $PRODUCT_OBJ$ : JSON
		@stickerOne => $PRODUCT_OBJ$ : JSON
		@stickerTwo => $PRODUCT_OBJ$ : JSON
		@done => show if order is done : boolean -> defaultsTo: false
*/

var vendingId = "2";
var fs = require('fs');
var fileName = "/data/ownCloud/Documents/data.csv";
var fileName2 = "/data/ownCloud/Documents/report.csv";
var productDesc = {"7":"emoji1","8":"emoji2","9":"emoji3","10":"emoji4","11":"emoji5","12":"emoji6","1":"Fun","2":"Together","3":"Holiday","4":"Summer","5":"Forever","6":"Love"};

var getProductName = function(prod)
{
  return productDesc[prod.id];
}

var header = ["date_vendingNum"];
for (var i = 1; i <= 12; i++) {
  header.push(productDesc[i]);
};
header.push("teamName");

var headerReport = ["date_vendingNum"];
for (var i = 1; i <= 12; i++) {
  headerReport.push(productDesc[i]);
};

var reportAppend = function(obj)
{
  var d = new Date().toISOString();
  var line = [d,0,0,0,0,0,0,0,0,0,0,0,0];
  line[obj.smileyOne] = 1;
  line[obj.smileyTwo] = 1;
  line[obj.stickerOne] = 1;
  line[obj.stickerTwo] = 1;
  // line.push(obj.teamName);      
  fs.appendFileSync(fileName2, line.join() + "\n");
}

var report = function(obj)
{
  fs.access(fileName2, fs.F_OK, function (err) {
    if (err)
    {
      fs.writeFile(fileName2, headerReport.join()+"\n", function (err) {
        if (err) console.log(err);
        report(obj);
      });
    }
    else
    {
      fs.readFile(fileName2, 'utf-8', function(err, data) {
        if (err) console.log(err);
        var lines = data.trim().split('\n');
        
        if (lines.length > 1)
        {
          var lastLine = lines.slice(-1)[0];
          var fields = lastLine.split(',');

          var oldDay = new Date(fields[0]).getUTCDate();
          var oldMonth = new Date(fields[0]).getUTCMonth();
          var oldOldYear = new Date(fields[0]).getFullYear();
          var day = new Date().getUTCDate();
          var month = new Date().getUTCMonth()
          var year = new Date().getFullYear();

          if (oldDay < day || oldMonth < month || oldOldYear < year)
          {
            reportAppend(obj);
          }
          else
          { 
            var line = fields;
            line[obj.smileyOne] = parseInt(line[obj.smileyOne]) + 1;
            line[obj.smileyTwo] = parseInt(line[obj.smileyOne]) + 1;
            line[obj.stickerOne] = parseInt(line[obj.smileyOne]) + 1;
            line[obj.stickerTwo] = parseInt(line[obj.smileyOne]) + 1;
            
            lines.pop();
            lines.push(line.join());

            fs.writeFile(fileName2, lines.join("\n"), function (err) {
              if (err) throw err;
              console.log('It\'s saved!');
            });

            console.log(lines);

            // line.push(obj.teamName);
          }
        }
        else
        {
          reportAppend(obj);
        }

      });
    }
  });
}

var store = function(obj)
{
  fs.access(fileName, fs.F_OK, function (err) {
    if (err)
    {
      fs.writeFile(fileName, header.join()+"\n", function (err) {
        if (err) console.log(err);
        store(obj);
      });
    }
    else
    {
      var d = new Date().toISOString();
      var line = [d,0,0,0,0,0,0,0,0,0,0,0,0];
      line[obj.smileyOne] = 1;
      line[obj.smileyTwo] = 1;
      line[obj.stickerOne] = 1;
      line[obj.stickerTwo] = 1;
      line.push(obj.teamName);
      fs.appendFileSync(fileName, line.join() + "\n");
    }
  });
}

module.exports = {

  attributes: {
  	teamName : {type: "string", defaultsTo: "Team Awesome"},
  	smileyOne : {model: "Product", required: true},
		smileyTwo : {model: "Product", required: true},
		stickerOne : {model: "Product", required: true},
		stickerTwo : {model: "Product", required: true},
    done : {type: 'boolean', defaultsTo: false},
		picture : {type: 'boolean', defaultsTo: false}
  },
  afterCreate: function(obj,next)
  {
    Product
    .find({id:[obj.smileyOne,obj.smileyTwo,obj.stickerOne,obj.stickerTwo]})
    .exec(function(e,r){
      console.log(e,r);
      for (var i = 0; i < r.length; i++) {
        r[i].qty--;
        r[i].save();
      };
      report(obj);
      store(obj);
      next();
    },function(err){
      console.log("ERR",err);
  	  next();
    });
  }
};

