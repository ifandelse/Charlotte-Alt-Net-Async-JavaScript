var TimeTraveler = function(name) {
	this.name = name;
	this.id = createUUID();
};
TimeTraveler.prototype = new EventEmitter();
TimeTraveler.prototype.getInTimeMachine = function(timeMachine) {
	setTimeout(function() {
		this.timeMachine = timeMachine;
		this.emit("Driver.in.Time.Machine", this.name, timeMachine.name);
	}.bind(this), 0);
};

var timeTravelerBusAdapter = function(timeTraveler, bus) {
	// publish bridge(s)
	timeTraveler.on("Driver.in.Time.Machine", function(name, timeMachineName) {
		bus.timeTraveler.publish({
			topic: "Driver.in.Time.Machine",
			data: {
				msg: name + " is now in the " + timeMachineName + "."
			}
		});
	});

	// subscription bridge(s)
	bus.timeTraveler.subscribe("add.machine", function(d, e) {
		this.getInTimeMachine(d); // TODO: Change this
	}).withContext(timeTraveler);

	bus.timeTraveler.publish({
		topic: "traveler.ready",
		data: {
			travelerId: timeTraveler.id,
			name: timeTraveler.name
		}
	});
};
