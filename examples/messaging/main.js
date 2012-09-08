// http://jsfiddle.net/ifandelse/XfqC9/
var bus = {
	scientist    : postal.channel("scientist", "*"),
	timeTraveler : postal.channel("timeTraveler", "*"),
	timeMachine  : postal.channel("timeMachine", "*"),
	lightning    : postal.channel("lightning", "*")
};

postal.when([
	{ channel: "timeTraveler", topic: "traveler.ready" },
	{ channel: "timeMachine",  topic: "machine.ready" }
], function( travelerInfo, machineInfo ) {
	postal.publish({
		channel: "timeMachine",
		topic: "add.driver",
		data: travelerInfo
	});
	postal.publish({
		channel: "timeTraveler",
		topic: "add.machine",
		data: machineInfo
	});
});

postal.when([
	{ channel: "timeTraveler", topic: "Driver.in.Time.Machine" },
	{ channel: "scientist",    topic: "Cable.Attached.To.ClockTower" }
], function(travelerInfo, machineInfo) {
	postal.publish({
		channel: "timeMachine",
		topic: "floor.it",
		data: {}
	});
});

var lightning = new Lightning();
var doc       = new Scientist("Doc Brown");
var delorean  = new TimeMachine("Delorean", 1985);
var marty     = new TimeTraveler("Marty McFly");
var results   = new Results(bus);

scientistBusAdapter(doc, bus);
timeTravelerBusAdapter(marty, bus);
timeMachineBusAdapter(delorean, bus);
lightningBusAdapter(lightning, bus);

doc.hangCableOnClockTower();​