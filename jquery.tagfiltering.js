(function( $ ) {
	$.fn.tagfiltering = function(list, options) {
		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({

		}, options);

		try {
			// constants & preconditions
			if (!(list instanceof jQuery))	throw "list of items to filter must be specified as jQuery object";
			var $items = list.children();
			if (!$items.length)				throw "no valid target items to filter";
			if (!(this instanceof jQuery))	throw "list of tags to use as filter must be specified as jQuery object";
			var $tags = this.children();
			if (!$tags.length)				throw "called on invalid element (should be non-empty html list of tags)"

			// bind to click
			$tags.click(function(event) {
				event.preventDefault();

				var target_tag = $(this).attr("data-tag");
				get_filtered_data(target_tag);
			});


			// actual filtering
			function get_filtered_data(target_tag) {
				if (!target_tag)			throw "no tag specified";
				console.log(target_tag);

				var $filtered_items = $items.clone().filter(function() {
					var tags = $(this).attr("data-tags").split(", ?");
					//console.log(tags);

					// it doesn't have the tag, oh noo
					if ($.inArray(target_tag, tags) == -1)
						return false;
					else
						return true;
				});
			}


		}
		catch (err) {
			console.log("jQuery Tag Filtering failed: " + err);
		}

		return this;
	};
})( jQuery );
