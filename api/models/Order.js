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

module.exports = {

  attributes: {
  	teamName : {type: "string", required: true},
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
      next();
    },function(err){
      console.log("ERR",err);
  	  next();
    });
  }
};

