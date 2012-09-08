
var TimeMachine = function(name, targetYear) {
	this.name = name;
	this.targetYear = targetYear;
	this.speed = 0;
};
TimeMachine.prototype.touchCable = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve(self.name);
		}, 0);
	}).promise();
};
TimeMachine.prototype.addDriver = function(driver) {
	this.driver = driver;
};
TimeMachine.prototype.goTo88Mph = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			self.speed = 88;
			dfd.resolve(self.name);
		}, 1500);
	}).promise();
};
TimeMachine.prototype.timeTravel = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve(self.name, self.driver.name, self.targetYear);
		}, 0);
	}).promise();
};

var Scientist = function(name) {
	this.name = name;
};
Scientist.prototype.hangCableOnClockTower = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve(self.name);
		}, 500);
	}).promise();
};
Scientist.prototype.slideDownCable = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve(self.name);
		}, 300);
	}).promise();
};
Scientist.prototype.connectCableOnStreet = function() {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve(self.name);
		}, 300);
	}).promise();
};

var TimeTraveler = function(name) {
	this.name = name;
};
TimeTraveler.prototype.getInTimeMachine = function(timeMachine) {
	var self = this;
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			timeMachine.addDriver(self);
			dfd.resolve(self.name, timeMachine.name);
		}, 0);
	}).promise();
};

var Lightning = function() {};
Lightning.prototype.strike = function() {
	return $.Deferred(function(dfd) {
		setTimeout(function() {
			dfd.resolve();
		}, 500);
	}).promise();
};

var results = {
	messages: [],
	push: function(msg) {
		this.messages.push(msg);
		console.log("pushing: " + msg);
		$("body").append("<div>" + msg + "</div>");
	}
};

var lightning = new Lightning();
var doc = new Scientist("Doc Brown");
var delorean = new TimeMachine("Delorean", 1985);
var marty = new TimeTraveler("Marty McFly"); 