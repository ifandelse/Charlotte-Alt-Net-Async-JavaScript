// http://jsfiddle.net/ifandelse/zp7mR/
doc.on("Cable.Attached.To.ClockTower", function() {
	marty.getInTimeMachine(delorean);
});
marty.on("Driver.in.Time.Machine", delorean.goTo88Mph.bind(delorean));
delorean.on("Reached.88mph", doc.slideDownCable.bind(doc));
doc.on("Street.Cable.Connected", lightning.strike.bind(lightning));
lightning.on("Lightning.Strike", delorean.touchCable.bind(delorean));

doc.hangCableOnClockTower();​