/*
 * jQuery Tag Filtering 0.3.0
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
			items: ".filter-items",
			active_class: "active",
			quicksand: false
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

				// decide what to do
				if ($(this).hasClass(settings.active_class))
					$(this).removeClass(settings.active_class);
				else
					$(this).addClass(settings.active_class);

				// update appearance
				replace_items(get_all_filtered_items());
			});


			// find all items for all currently active tags
			function get_all_filtered_items() {
				var $active_tags = $tags.filter("." + settings.active_class);

				// no tags selected
				if (!$active_tags.length) {
					var item_array = [];
					_.each($items.toArray(), function(item) {
						item_array.push(item.outerHTML);
					});
					return item_array;
				}

				var all_filtered_items = [];

				$active_tags.each(function() {
					var target_tag = $(this).attr("data-tag");
					var filtered_items = get_filtered_items(target_tag);
					_.each(filtered_items, function(item) {
						if (!_.contains(all_filtered_items, item))
							all_filtered_items.push(item);
					});
				});

				return all_filtered_items;
			}

			// find all items for one tag
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
				if (settings.quicksand) {
					// prepare a list for new data
					var $new_data = $("#new-filter-items");
					if (!$new_data.length) {
						var new_list = "<ul id=\"new-filter-items\"></ul>";
						$(settings.items).after(new_list);
						$new_data = $("#new-filter-items").hide();
					} else $new_data.empty();

					// put data
					_.each(new_items, function(item) {
						$new_data.append(item);
					});

					// transition
					$(settings.items).quicksand($("#new-filter-items li"), {
						attribute: function(v) {
							console.log($(v).text());
							return $(v).text();
						},
// 						useScaling: true
					});
				} else {
					$(settings.items).empty();
					_.each(new_items, function(item) {
						$(settings.items).append(item);
					});
				}
			}

		}
		catch (err) {
			console.log("jQuery Tag Filtering failed: " + err);
		}

		return this;
	};
})( jQuery );
