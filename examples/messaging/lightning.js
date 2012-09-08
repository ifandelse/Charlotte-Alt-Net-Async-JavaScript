var Lightning = function() {};
Lightning.prototype = new EventEmitter();
Lightning.prototype.strike = function() {
	setTimeout(function() {
		this.emit("Lightning.Strike");
	}.bind(this), 500);
};

var lightningBusAdapter = function(lightning, bus) {
	// publish bridge(s)
	lightning.on("Lightning.Strike", function() {
		bus.lightning.publish({
			topic: "Lightning.Strike",
			data: {}
		});
	});

	// subscription bridge(s)
	bus.scientist.subscribe("Street.Cable.Connected", function(d, e) {
		this.strike();
	}).withContext(lightning);
};