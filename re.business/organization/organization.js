var Organization = function () {
  
  var _id, _orgName, _users, _listings;
  
  Object.defineProperty(this, "id", {
    configurable: false,
    enumerable: true,
    get: function () {
      return _id;
    },
    set: function (value) {
      _id = value;
    }
  })
  
  Object.defineProperty(this, "orgName",{
    configurable: false,
    enumerable: true,
    get: function () {
      return _orgName;
    },
    set: function (value) {
      _orgName = value;
    }
  });
  
  Object.defineProperty(this, "users",{
    configurable: false,
    enumerable: true,
    get: function () {
      return _users;
    },
    set: function (value) {
      _users = value;
    }
  });
  
  Object.defineProperty(this, "listings",{
    configurable: false,
    enumerable: true,
    get: function () {
      return _listings;
    },
    set: function (value) {
      _listings = value;
    }
  }); 
}



Organization.organizationMap = ["orgName", "users", "listings"];

module.exports = Organization;