(function( $ ) {
	$.fn.tagfiltering = function( list, options ) {
		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({

		}, options);

		// constants
		var $data = list;
		var $tags = this;

		try {
			// precondition checks
			if (!$data.length)		throw "no valid target list to filter";



		}
		catch (err) {
			console.log("jQuery Tag Filtering failed: " + err);
		}

		return this;
	};
})( jQuery );
