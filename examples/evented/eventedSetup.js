
var TimeMachine = function(name, targetYear) {
	this.name = name;
	this.targetYear = targetYear;
	this.speed = 0;
};
TimeMachine.prototype = new EventEmitter();
TimeMachine.prototype.touchCable = function() {
	setTimeout(function() {
		this.emit("Touched.Cable", this.name);
		this.timeTravel()
	}.bind(this), 0);
};
TimeMachine.prototype.addDriver = function(driver) {
	this.driver = driver;
};
TimeMachine.prototype.goTo88Mph = function() {
	setTimeout(function() {
		this.speed = 88;
		this.emit("Reached.88mph", this.name);
		console.log(this)
	}.bind(this), 1500);
};
TimeMachine.prototype.timeTravel = function() {
	setTimeout(function() {
		this.emit("Time.Travel.Complete", this.name, this.driver.name, this.targetYear);
	}.bind(this), 0);
};

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

var TimeTraveler = function(name) {
	this.name = name;
};
TimeTraveler.prototype = new EventEmitter();
TimeTraveler.prototype.getInTimeMachine = function(timeMachine) {
	setTimeout(function() {
		timeMachine.addDriver(this);
		this.emit("Driver.in.Time.Machine", this.name, timeMachine.name);
	}.bind(this), 0);
};

var Lightning = function() {};
Lightning.prototype = new EventEmitter();
Lightning.prototype.strike = function() {
	setTimeout(function() {
		this.emit("Lightning.Strike");
	}.bind(this), 500);
};

var Results = function(lightning, marty, doc, delorean) {
	res = {
		write: function(msg) {
			console.log("pushing: " + msg);
			$("body").append("<div>" + msg + "</div>");
		}
	};

	lightning.on("Lightning.Strike", function() {
		res.write("Lightning strike!");
	});
	marty.on("Driver.in.Time.Machine", function(name, timeMachineName) {
		res.write(name + " is now in the " + timeMachineName + ".");
	});
	doc.on("Street.Cable.Connected", function(name) {
		res.write(name + " connected the cable on the street.");
	});
	doc.on("Slid.Down.Cable", function(name) {
		res.write(name + " slid down the cable to the street.");
	});
	doc.on("Cable.Attached.To.ClockTower", function(name) {
		res.write(name + " attached cable to clock tower.");
	});
	delorean.on("Time.Travel.Complete", function(name, driverName, year) {
		res.write(name + " took " + driverName + " to the year " + year + ".");
	});
	delorean.on("Reached.88mph", function(name, driverName, year) {
		res.write(name + " has reached 88 mph.");
	});
	delorean.on("Touched.Cable", function(name, driverName, year) {
		res.write(name + " touched the cable.");
	});

	return res;
};

var lightning = new Lightning();
var doc = new Scientist("Doc Brown");
var delorean = new TimeMachine("Delorean", 1985);
var marty = new TimeTraveler("Marty McFly");
var results = new Results(lightning, marty, doc, delorean); 