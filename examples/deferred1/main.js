// http://jsfiddle.net/ifandelse/Hed5P/
// If you don't use pipe(), chained deferreds become a pyramid of doom as well
$.when(
	doc.hangCableOnClockTower(),
	marty.getInTimeMachine(delorean)
).done(
	function(sciName, trv) {
		results.push(sciName + " has attached the cable to the clock tower.");
		results.push(trv[0] + " is now inside the " + trv[1] + ".");
		$.when(
			delorean.goTo88Mph(),
			doc.slideDownCable()
		).done(
			function(tmName, sciName) {
				results.push(tmName + " has reached 88 mph.");
				results.push(sciName + " slid down the cable to the street.");
				doc.connectCableOnStreet()
					.done(function(sciName) {
						results.push(sciName + " connected the cable on the street.");
						lightning.strike().done(
							function() {
								results.push("Lightning strike!");
								delorean.touchCable().done(
									function(tmName) {
										results.push(tmName + " touched the cable.");
										delorean.timeTravel().done(
											function(tmName, trvName, year) {
												results.push(tmName + " took " + trvName + " to the year " + year);
											}
										)
									}
								)
							}
						);
					}
				)
			}
		)
	}
);
​