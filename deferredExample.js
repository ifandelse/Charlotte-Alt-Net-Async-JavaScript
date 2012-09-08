var getCustomerData = function( id ) {
    return $.Deferred(function ( dfd ) {
      // let's put a 5-second time on this thing
      setTimeout( function() {
        dfd.reject( "Timeout Fail Whale" );
      }, 5000);
      // our deferred is wrapping a fictional 3rd party lib call that takes a callback
      app.data.makeAllTheAjaxCalls(id, function( err, customer, orders, contacts ){
        if( err ) {
          dfd.reject( err );
        }
        dfd.resolve({
          customer : customer,
          orders   : orders,
          contacts : contacts
        });
      });
    }).promise();
};

// one way to consume the promise
getCustomerData( 21 ).then(
	model.update,   // what to do if things succeed
	app.errorNotice // what to do if things fail
);

// OR we can do this
getCustomerData( 21 )
	.done( model.update )      // what to do if things succeed
	.fail( app.errorNotice );  // what to do if things fail

