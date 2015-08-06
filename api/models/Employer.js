/**
* Employer.js
*
* @description :: TODO: You might write a short summary of how this model works and what it represents here.
* @docs        :: http://sailsjs.org/#!documentation/models
*/

module.exports = {

  attributes: {
  	owners: {collection: 'Owner', via: 'employers'},
  	employees: {collection: 'Employee', via: 'employers'},
  	pemployees: {collection: 'Employee', via: 'pemployers'}
  }
};

