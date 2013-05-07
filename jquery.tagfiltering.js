(function( $ ) {
	$.fn.tagfiltering = function( list, options ) {
		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({

		}, options);

		// constants
		var $data = list;
		var $tags = $(this).children();

		try {
			// precondition checks
			if (!$data.length)		throw "no valid target list to filter";
			if (!$tags.length)		throw "called on invalid element (should be html list of tags)"

			$tags.click(function(event) {
				event.preventDefault();

				var target_tag = $(this).attr("data-tag");
			});



		}
		catch (err) {
			console.log("jQuery Tag Filtering failed: " + err);
		}

		return this;
	};
})( jQuery );
