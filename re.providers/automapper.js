"use strict"

function AutoMapper () {
	 
};

AutoMapper.Map = function (source, destination, map) {
	
	if (source["_id"]) {
		destination["id"] = source["_id"];
	}
	
	for(var i = 0; i < map.length; i++ ) {	
		let key = map[i];
		if (destination.hasOwnProperty(key)) {
			destination[key] = source[key];
		}
	}
	
	return destination;
};

module.exports = AutoMapper;