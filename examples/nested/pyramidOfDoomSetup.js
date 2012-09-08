
var results = {
	messages: [],
	push: function(msg) {
		this.messages.push(msg);
		console.log("pushing: " + msg);
		$("body").append("<div>" + msg + "</div>");
	}
};

var TimeMachine = function(name) {
	this.name = name;
	this.speed = 0;
};
TimeMachine.prototype.touchCable = function(cb) {
	setTimeout(function() {
		results.push(this.name + " touched the cable.");
		cb(null);
	}.bind(this), 0);
};
TimeMachine.prototype.addDriver = function(driver) {
	this.driver = driver;
};
TimeMachine.prototype.goTo88Mph = function(cb) {
	setTimeout(function() {
		this.speed = 88;
		results.push(this.name + " has reached 88 mph.");
		cb(null);
	}.bind(this), 1500);
};
TimeMachine.prototype.timeTravel = function(year, cb) {
	setTimeout(function() {
		results.push(this.name + " took " + this.driver.name + " to the year " + year + ".");
		cb(null);
	}.bind(this), 0);
};

var Scientist = function(name) {
	this.name = name;
};
Scientist.prototype.hangCableOnClockTower = function(cb) {
	setTimeout(function() {
		results.push(this.name + " attached cable to clock tower.");
		cb(null);
	}.bind(this), 500);
};
Scientist.prototype.slideDownCable = function(cb) {
	setTimeout(function() {
		results.push(this.name + " slid down the cable to the street.");
		cb(null);
	}.bind(this), 300);
};
Scientist.prototype.connectCableOnStreet = function(cb) {
	setTimeout(function() {
		results.push(this.name + " connected the cable on the street.");
		cb(null);
	}.bind(this), 300);
};

var TimeTraveler = function(name, year) {
	this.year = year;
	this.name = name;
};
TimeTraveler.prototype.getInTimeMachine = function(timeMachine, cb) {
	setTimeout(function() {
		timeMachine.addDriver(this);
		results.push(this.name + " is now in the " + timeMachine.name + ".");
		cb(null);
	}.bind(this), 0);
};

var Lightning = function() {};
Lightning.prototype.strike = function(cb) {
	setTimeout(function() {
		results.push("Lightning strike!");
		cb(null);
	}.bind(this), 500);
};

var lightning = new Lightning();
var doc = new Scientist("Doc Brown");
var delorean = new TimeMachine("delorean");
var marty = new TimeTraveler("Marty McFly", 1955); 