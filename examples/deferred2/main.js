// http://jsfiddle.net/ifandelse/AhYtx/
$.when( doc.hangCableOnClockTower(), marty.getInTimeMachine(delorean) ).done(function( sciName, trv ) {
	results.push( sciName + " has attached the cable to the clock tower." );
	results.push( trv[0] + " is now inside the " + trv[1] + "." );
}).pipe(function() {
		return $.when(
			delorean.goTo88Mph(),
			doc.slideDownCable()
		).done(function( tmName, sciName ) {
				results.push( tmName + " has reached 88 mph." );
				results.push( sciName + " slid down the cable to the street." );
			});
	}).pipe(function() {
		return $.when( doc.connectCableOnStreet() ).done(function( sciName ) {
			results.push( sciName + " connected the cable on the street." );
		});
	}).pipe(function() {
		return $.when( lightning.strike() ).done(function( sciName ) {
			results.push("Lightning strike!");
		});
	}).pipe(function() {
		$.when( delorean.touchCable() ).done(function( tmName ) {
			results.push( tmName + " touched the cable." );
		});
	}).pipe(function() {
		return $.when( delorean.timeTravel() ).done(function( tmName, trvName, year ) {
			results.push( tmName + " took " + trvName + " to the year " + year );
		});
	});
​