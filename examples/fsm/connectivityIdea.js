var ConnectivityFsm = ( function( $, machina, amplify ) {

	return function( heartbeatDef ) {

		var settings = $.extend( true, {
			type: "GET",
			dataType: "json",
			timeout: 5000
		}, heartbeatDef );

		amplify.request.define( "heartbeat-check", "ajax", settings );

		var fsm = new machina.Fsm({

			initialState: "probing",

			states: {
				probing: {
					_onEnter: function() {
						var self = this;
						self.fireEvent( "probing", { timeStamp: new Date() } );
						amplify.request({
							resourceId: "heartbeat-check",
							success: function() { self.handle( "heartbeat" );    },
							"error": function() { self.handle( "no-heartbeat" ); }
						});
						self.heartbeatTimeout = setTimeout( function(){
							self.handle( "no-heartbeat" );
						}, settings.timeout );
					},
					heartbeat: function() {
						clearTimeout( this.heartbeatTimeout );
						this.transition( "online" );
					},
					"no-heartbeat": function() {
						clearTimeout( this.heartbeatTimeout );
						this.transition( "offline" );
					},
					"*" : function() {
						this.deferUntilTransition();
					}
				},

				offline: {
					_onEnter: function() {
						this.fireEvent( "offline", { timeStamp: new Date() } );
					},

					"window.online": function() {
						this.transition( "probing" );
					},

					"appCache.downloading": function() {
						this.transition( "probing" );
					},

					goOnline: function() {
						this.transition( "probing" );
					}
				},

				online: {
					_onEnter: function() {
						this.fireEvent( "online", { timeStamp: new Date() } );
					},

					"window.offline": function() {
						this.transition( "probing" );
					},

					"appCache.error": function() {
						this.transition( "probing" );
					},

					"request.timeout": function() {
						this.transition( "probing" );
					},

					goOffline: function() {
						this.transition( "offline" );
					}
				}
			}
		});

		$( window ).bind( "online", function(){
			fsm.handle( "window.online" );
		});

		$( window ).bind( "offline", function(){
			fsm.handle( "window.offline" );
		});

		$( window.applicationCache ).bind( "error", function() {
			fsm.handle( "appCache.error" );
		});

		$( window.applicationCache ).bind( "downloading", function() {
			fsm.handle( "appCache.downloading" );
		});

		return fsm;
	};

})( jQuery, machina, amplify, undefined );