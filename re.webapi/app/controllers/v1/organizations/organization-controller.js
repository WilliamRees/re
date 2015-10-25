var Organization = require('../../../../../re.business/organization/organization.js');
var provider = require('../../../../../re.providers/providers.js');
var AutoMapper = require('../../../../../re.providers/automapper.js');
function OrganizationsController() {
}

function put(req, res, next) {
  var organization = AutoMapper.Map(req.body, new Organization(), Organization.organizationMap);
  
  provider.organizationProvider.save(organization, function (error) {
    res.status(500).json({error: error, errmsg: error.errmsg});
      return;
  }).then(function (organization) {
    res.status(201).location('/api/v1/organization/' + organization.id).json({success:true, data: {organization: organization }});
    return;
  }); 
}

function get(req, res, next) {
  var id = req.params.id;
  provider.organizationProvider.findOne({_id: id}).then(function (organization) {
    res.json(organization)
  });
}

OrganizationsController.prototype = {
  put: put,
  get: get
};

var organizationsController = new OrganizationsController();

module.exports = organizationsController;
