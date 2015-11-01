/**
* Product.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
		@type => 0 -> "Smiley", 1 -> "Sticker"
		@qty => $QTY_LEFT$ : integer
*/

module.exports = {

  connection: "local",
  attributes: {
  	type: {type:"integer",required: true},
  	qty: {type:"integer",required: true}
  }
};

