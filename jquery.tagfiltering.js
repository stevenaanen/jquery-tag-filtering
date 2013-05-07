/*
 * jQuery Tag Filtering 0.1.0
 * http://www.appophetweb.nl
 * https://github.com/stevenaanen/jquery-tag-filtering
 * Copyright 2013, AppOpHetWeb
 * Free to use under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
*/
(function( $ ) {
	$.fn.tagfiltering = function(options) {
		// Create some defaults, extending them with any options that were provided
		var settings = $.extend({
			items: ".filter-items"
		}, options);

		try {
			// constants & preconditions
			var $items = $(settings.items).children();
			if (!$items.length)				throw "no valid target items to filter";
			var $tags = this.children();
			if (!$tags.length)				throw "called on invalid element (should be non-empty html list of tags)"

			// bind to click
			$tags.click(function(event) {
				event.preventDefault();

				var target_tag = $(this).attr("data-tag");
				var filtered_items = get_filtered_items(target_tag);
				replace_items(filtered_items);

				// update appearance
				$(this).addClass("active");
			});


			// actual filtering
			function get_filtered_items(target_tag) {
				if (!target_tag)			throw "no tag specified";

				var filtered_items = [];

				$items.clone().each(function() {
					var tags = $(this).attr("data-tags").split(new RegExp("[,;] ?"));

					// it has the tag, this must be my lucky day
					if ($.inArray(target_tag, tags) != -1)
						filtered_items.push(this.outerHTML);
				});

				return filtered_items;
			}


			// hard replace with new resultset
			function replace_items(new_items) {
				$(settings.items).empty().append(new_items);
			}

		}
		catch (err) {
			console.log("jQuery Tag Filtering failed: " + err);
		}

		return this;
	};
})( jQuery );
