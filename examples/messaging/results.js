var Results = function(bus) {
	res = {
		write: function(data) {
			if (data.msg) {
				$("body").append("<div>" + data.msg + "</div>");
			}
		}
	};

	_.each(bus, function(channel) {
		channel.subscribe("*", res.write);
	});

	return res;
};