var Scientist = function(name) {
	this.name = name;
};
Scientist.prototype = new EventEmitter();
Scientist.prototype.hangCableOnClockTower = function() {
	setTimeout(function() {
		this.emit("Cable.Attached.To.ClockTower", this.name);
	}.bind(this), 500);
};
Scientist.prototype.slideDownCable = function() {
	setTimeout(function() {
		this.emit("Slid.Down.Cable", this.name);
		this.connectCableOnStreet();
	}.bind(this), 300);
};
Scientist.prototype.connectCableOnStreet = function() {
	setTimeout(function() {
		this.emit("Street.Cable.Connected", this.name);
	}.bind(this), 300);
};

var scientistBusAdapter = function(scientist, bus) {
	// publish bridge(s)
	scientist.on("Street.Cable.Connected", function(name) {
		bus.scientist.publish({
			topic: "Street.Cable.Connected",
			data: {
				msg: name + " connected the cable on the street."
			}
		});
	});
	scientist.on("Slid.Down.Cable", function(name) {
		bus.scientist.publish({
			topic: "Slid.Down.Cable",
			data: {
				msg: name + " slid down the cable to the street."
			}
		});
	});
	scientist.on("Cable.Attached.To.ClockTower", function(name) {
		bus.scientist.publish({
			topic: "Cable.Attached.To.ClockTower",
			data: {
				msg: name + " attached cable to clock tower."
			}
		});
	});

	// subscription bridge(s)
	bus.timeMachine.subscribe("Reached.88mph", function(d, e) {
		scientist.slideDownCable();
	}).withContext(scientist);

};