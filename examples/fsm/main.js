// http://jsfiddle.net/ifandelse/rdaRh/
var fsm = new machina.Fsm( {

	checkIfReady : function () {
		if ( _.all( this.constraints[this.state].checkList, function ( constraint ) {
			return constraint;
		} ) ) {
			this.transition( this.constraints[this.state].nextState );
		}
	},

	constraints : {
		cableNotReady : {
			nextState : "deloreanNotReady",
			checkList : {
				streetCableConnected : false,
				clockTowerCableConnected : false
			}
		},
		deloreanNotReady : {
			nextState : "readyToDrive",
			checkList : {
				driverInDelorean : false
			}
		},
		readyToDrive : {
			nextState : "readyForTimeTravel",
			checkList : {
				reached88Mph : false
			}
		},
		readyForTimeTravel : {
			nextState : "timeTravelComplete",
			checkList : {
				lightingStrike : false,
				touchedCable : false
			}
		}
	},

	states : {
		uninitialized : {
			start : function () {
				// other setup work here....
				this.transition( "cableNotReady" );
				marty.getInTimeMachine( delorean );
			}
		},
		cableNotReady : {
			_onEnter : function () {
				doc.hangCableOnClockTower();
				doc.connectCableOnStreet();
			},
			"Not.On.Street" : function ( name ) {
				this.fireEvent( "progress", name + " is not on the street!  Gotta slide down the cable first..." );
				doc.slideDownCable();
			},
			"Slid.Down.Cable" : function ( name ) {
				this.fireEvent( "progress", name + " slid down the cable to the street." );
				doc.connectCableOnStreet();
			},
			"Street.Cable.Connected" : function ( name ) {
				this.fireEvent( "progress", name + " connected the cable on the street." );
				this.constraints.cableNotReady.checkList.streetCableConnected = true;
				this.checkIfReady();
			},
			"ClockTower.Cable.Connected" : function ( name ) {
				this.fireEvent( "progress", name + " attached cable to clock tower." );
				this.constraints.cableNotReady.checkList.clockTowerCableConnected = true;
				this.checkIfReady();
			},
			"*" : function () {
				this.deferUntilTransition();
			}
		},
		deloreanNotReady : {
			"Driver.in.Delorean" : function ( trvName, tmName ) {
				this.fireEvent( "progress", trvName + " is now in the " + tmName + "." );
				this.constraints.deloreanNotReady.checkList.driverInDelorean = true;
				this.checkIfReady();
			},
			"*" : function () {
				this.deferUntilTransition();
			}
		},
		readyToDrive : {
			_onEnter : function () {
				delorean.goTo88Mph();
			},
			"Reached.88mph" : function ( name ) {
				this.fireEvent( "progress", name + " has reached 88 mph." );
				this.constraints.readyToDrive.checkList.reached88Mph = true;
				this.checkIfReady();
			},
			"*" : function () {
				this.deferUntilTransition();
			}
		},
		readyForTimeTravel : {
			_onEnter : function () {
				lightning.strike();
				delorean.touchCable();
			},
			"Delorean.Touched.Cable" : function ( name ) {
				this.fireEvent( "progress", name + " touched the cable." );
				this.constraints.readyForTimeTravel.checkList.touchedCable = true;
				this.checkIfReady();
			},
			"Lightning.Strike" : function () {
				this.fireEvent( "progress", "Lightning Strike!" );
				this.constraints.readyForTimeTravel.checkList.lightingStrike = true;
				this.checkIfReady();
			},
			"*" : function () {
				this.deferUntilTransition();
			}
		},
		timeTravelComplete : {
			"Time.Travel.Complete" : function ( tmName, trvName, year ) {
				this.fireEvent( "progress", tmName + " took " + trvName + " to the year " + year + "." );
			}
		}
	}
} );

fsm.on( "progress", results.write );
var fsmAdapter = new FsmAdapter( fsm, lightning, doc, delorean, marty );

fsm.handle( "start" );
​