// http://jsfiddle.net/ifandelse/qcbF6/#base
doc.hangCableOnClockTower(function(err) {
	if(!err) {
		marty.getInTimeMachine(delorian, function(err) {
			if(!err) {
				delorian.goTo88Mph(function(err) {
					if(!err) {
						doc.slideDownCable(function(err) {
							if(!err) {
								doc.connectCableOnStreet(function(err) {
									if(!err) {
										lightning.strike(function(err) {
											if(!err) {
												delorian.touchCable(function(err) {
													if(!err) {
														delorian.timeTravel(1985, function(err){
															console.log(JSON.stringify(results.messages, null, 4));
														});
													}
												});
											}
										});
									}
								});
							}
						});
					}
				});
			}
		});
	}
});

