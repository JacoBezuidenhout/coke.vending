/**
* Employee.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	employers: {collection: 'Employer', via: 'employees'},
  	pemployers: {collection: 'Employer', via: 'pemployees'},
  	idNumber: {type: 'text', unique: true}
  }
};

