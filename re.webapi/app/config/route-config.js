var settingsConfig = require('./settings/settings-config');
var jwt    = require('jsonwebtoken');

function RouteConfig() {
}

function registerRoutes(application) {
  var config = loadRouteConfig();
  var routeItem, controller, route, method;
  
  for(var i = 0, length = config.routes.length; i < length; i++) {
    routeItem = config.routes[i];

    controller = loadController(routeItem);
    route = getRoute(routeItem);
    method = getMethod(routeItem);

    registerRoute(application, controller, route, method);
  }
  
  application.use(function(req, res, next) {

    // check header or url parameters or post parameters for token
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    console.log("token = " + token);
    // decode token
    if (token) {
  
      // verifies secret and checks exp
      jwt.verify(token, "ilovescotchyscotch", function(err, decoded) {      
        if (err) {
          return res.json({ success: false, message: 'Failed to authenticate token.' });    
        } else {
          // if everything is good, save to request for use in other routes
          req.decoded = decoded;
          console.log("decoded");    
          console.log(decoded);
          next();
        }
      });
  
    } else {
  
      // if there is no token
      // return an error
      return res.status(403).send({ 
          success: false, 
          message: 'No token provided.' 
      });
      
    }
  });
  
  for(var i = 0, length = config.authenticatedRoutes.length; i < length; i++) {
    routeItem = config.authenticatedRoutes[i];

    controller = loadController(routeItem);
    route = getRoute(routeItem);
    method = getMethod(routeItem);

    registerRoute(application, controller, route, method);
  }

  createConfigRoute(application);
}

function loadRouteConfig() {
  var config;

  try {
    config = require('./route.config.json');

    if(!config.routes || config.routes.length === 0) {
      throw '"routes" not defined';
    }
  }
  catch(e) {
    throw 'Unable to parse "lib/config/route.config.json": ' + e;
  }

  return config;
}

function loadController(routeItem) {
  var controller;

  if(!routeItem || !routeItem.controller) {
    throw 'Undefined "controller" property in "lib/config/route.config.json"';
  }

  try {
    controller = require(routeItem.controller);
  }
  catch(e) {
    throw 'Unable to load ' + routeItem.controller + ": " + e;
  }

  return controller;
}

function getRoute(routeItem) {
  if(!routeItem || !routeItem.route || routeItem.route.length === 0) {
    throw 'Undefined or empty "route" property in "lib/config/route.config.json"';
  }

  return routeItem.route;
}

function getMethod(routeItem) {
  if(!routeItem || !routeItem.method || routeItem.method.length === 0) {
    throw 'Undefined or empty "method" property in "lib/config/route.config.json"';
  }

  var method = routeItem.method.toLowerCase();

  switch(method) {
    case 'get':
    case 'put':
    case 'post':
    case 'delete':
      return method;
      break;
    default:
      throw 'Invalid REST "method" property in "lib/config/route.config.json": ' + method;
  }
}

function registerRoute(application, controller, route, method) {
  application.route(route)[method](function(req, res, next) {
    controller[method](req, res, next);
  });
}

function createConfigRoute(application) {
  application.route('/config').get(function(req, res, next) {
    res.status(200).json(settingsConfig.settings);
  });
}

RouteConfig.prototype = {
  registerRoutes: registerRoutes
};

var routeConfig = new RouteConfig();

module.exports = routeConfig;
