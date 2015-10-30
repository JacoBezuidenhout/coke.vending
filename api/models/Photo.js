/**
* Photo.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
		@id => MongoDB _id
		@order => $ORDER_ID$ : MongoDB _id
		@url => Picture URL : string
*/

var takePicture = function()
{
	return "";
}

module.exports = {

  attributes: {
  	order: {model: "Order", required: true},
  	url: {type: "string", defaultsTo: takePicture()}
  }
};

