var TimeMachine = function(name, targetYear) {
	this.name = name;
	this.targetYear = targetYear;
	this.speed = 0;
	this.id = createUUID();
};
TimeMachine.prototype = new EventEmitter();
TimeMachine.prototype.touchCable = function() {
	setTimeout(function() {
		this.emit("Touched.Cable", this.name);
		this.timeTravel();
	}.bind(this), 0);
};
TimeMachine.prototype.addDriver = function(driver) {
	setTimeout(function() {
		this.driver = driver;
		this.emit("Machine.Has.Driver", driver.name, this.name);
	}.bind(this), 0);
};
TimeMachine.prototype.goTo88Mph = function() {
	setTimeout(function() {
		this.speed = 88;
		this.emit("Reached.88mph", this.name);
		console.log(this);
	}.bind(this), 1500);
};
TimeMachine.prototype.timeTravel = function() {
	setTimeout(function() {
		this.emit("Time.Travel.Complete", this.name, this.driver.name, this.targetYear);
	}.bind(this), 0);
};

var timeMachineBusAdapter = function(timeMachine, bus) {
	// publish bridge(s)
	timeMachine.on("Time.Travel.Complete", function(name, driverName, year) {
		bus.timeMachine.publish({
			topic: "Time.Travel.Complete",
			data: {
				msg: name + " took " + driverName + " to the year " + year + "."
			}
		});
	});
	timeMachine.on("Reached.88mph", function(name) {
		bus.timeMachine.publish({
			topic: "Reached.88mph",
			data: {
				msg: name + " has reached 88 mph."
			}
		});
	});
	timeMachine.on("Touched.Cable", function(name, driverName, year) {
		bus.timeMachine.publish({
			topic: "Touched.Cable",
			data: {
				msg: name + " touched the cable."
			}
		});
	});
	// subscription bridge(s)
	bus.lightning.subscribe("Lightning.Strike", function(d, e) {
		this.touchCable();
	}).withContext(timeMachine);

	bus.timeMachine.subscribe("add.driver", function(d, e) {
		this.addDriver(d);
	}).withContext(timeMachine);

	bus.timeMachine.subscribe("floor.it", function(d, e) {
		this.goTo88Mph();
	}).withContext(timeMachine);

	bus.timeMachine.publish({
		topic: "machine.ready",
		data: {
			timeMachineId: timeMachine.id,
			name: timeMachine.name
		}
	});
};