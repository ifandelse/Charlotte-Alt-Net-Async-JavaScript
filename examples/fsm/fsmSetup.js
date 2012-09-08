
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
	this.location = "ClockTower";
};
Scientist.prototype = new EventEmitter();
Scientist.prototype.hangCableOnClockTower = function() {
	setTimeout(function() {
		this.emit("Cable.Attached.To.ClockTower", this.name);
	}.bind(this), 500);
};
Scientist.prototype.slideDownCable = function() {
	setTimeout(function() {
		this.location = "Street";
		this.emit("Slid.Down.Cable", this.name);
	}.bind(this), 300);
};
Scientist.prototype.connectCableOnStreet = function() {
	setTimeout(function() {
		if (this.location === "Street") {
			this.emit("Street.Cable.Connected", this.name);
		} else {
			this.emit("Not.On.Street", this.name);
		}
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

var results = {
	write: function(msg) {
		console.log("pushing: " + msg);
		$("body").append("<div>" + msg + "</div>");
	}
};

var FsmAdapter = function(fsm, lightning, doc, delorean, marty) {

	this.callbacks = {
		"Cable.Attached.To.ClockTower" : function ( name ) {
			fsm.handle( "ClockTower.Cable.Connected", name );
		},
		"Street.Cable.Connected": function ( name ) {
			fsm.handle( "Street.Cable.Connected", name );
		},
		"Slid.Down.Cable": function ( name ) {
			fsm.handle( "Slid.Down.Cable", name );
		},
		"Not.On.Street": function ( name ) {
		fsm.handle( "Not.On.Street", name );
		},
		"Driver.in.Time.Machine": function ( trvName, tmName ) {
			fsm.handle( "Driver.in.Delorean", trvName, tmName );
		},
		"Reached.88mph": function ( name ) {
			fsm.handle( "Reached.88mph", name );
		},
		"Touched.Cable": function ( name ) {
			fsm.handle( "Delorean.Touched.Cable", name );
		},
		"Time.Travel.Complete": function ( tmName, trvName, year ) {
			fsm.handle( "Time.Travel.Complete", tmName, trvName, year );
		},
		"Lightning.Strike": function () {
			fsm.handle( "Lightning.Strike" );
		}
	};

	doc.on(       "Cable.Attached.To.ClockTower", this.callbacks["Cable.Attached.To.ClockTower"]);
	doc.on(       "Street.Cable.Connected"      , this.callbacks["Street.Cable.Connected"]      );
	doc.on(       "Slid.Down.Cable"             , this.callbacks["Slid.Down.Cable"]             );
	doc.on(       "Not.On.Street"               , this.callbacks["Not.On.Street"]               );
	marty.on(     "Driver.in.Time.Machine"      , this.callbacks["Driver.in.Time.Machine"]      );
	delorean.on(  "Reached.88mph"               , this.callbacks["Reached.88mph"]               );
	delorean.on(  "Touched.Cable"               , this.callbacks["Touched.Cable"]               );
	delorean.on(  "Time.Travel.Complete"        , this.callbacks["Time.Travel.Complete"]        );
	lightning.on( "Lightning.Strike"            , this.callbacks["Lightning.Strike"]            );

	this.removeAdapter = function() {
		doc.off(       "Cable.Attached.To.ClockTower", this.callbacks["Cable.Attached.To.ClockTower"]);
		doc.off(       "Street.Cable.Connected"      , this.callbacks["Street.Cable.Connected"]      );
		doc.off(       "Slid.Down.Cable"             , this.callbacks["Slid.Down.Cable"]             );
		doc.off(       "Not.On.Street"               , this.callbacks["Not.On.Street"]               );
		marty.off(     "Driver.in.Time.Machine"      , this.callbacks["Driver.in.Time.Machine"]      );
		delorean.off(  "Reached.88mph"               , this.callbacks["Reached.88mph"]               );
		delorean.off(  "Touched.Cable"               , this.callbacks["Touched.Cable"]               );
		delorean.off(  "Time.Travel.Complete"        , this.callbacks["Time.Travel.Complete"]        );
		lightning.off( "Lightning.Strike"            , this.callbacks["Lightning.Strike"]            );
	}
};

var lightning = new Lightning();
var doc = new Scientist("Doc Brown");
var delorean = new TimeMachine("Delorean", 1985);
var marty = new TimeTraveler("Marty McFly"); 