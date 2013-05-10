jQuery Tag Filtering
====================

This plugin enables to use a simple list of clickable tags to filter an HTML list in which all elements are tagged using the `data-tags` attribute. Multiple selected tags are regarded as disjunctive query, that is, if you select multiple tags, the number of results gets larger.

Usage
-----

### HTML

The filtering plugin works on two plain HTML lists; one for the tags, and one for the items to filter. The markup could look like this:

	<ul class="tags">
		<li data-tag="foobar"><a href="#">Foobar</a></li>
		<li data-tag="unicorn"><a href="#">Unicorns</a></li>
	</ul>

	<ul class="filter-items">
		<li data-tags="unicorn"></li>
		<li data-tags="bash, foobar"></li>
	</ul>

You're not stuck to the class names used here. In fact, you could use any flavor you'd like. Because we're using a plain old list, you could apply any styling you want, and nest whatever you want in each list item. Just keep in mind that the click listener is on the list item, so make sure you apply margins and such on the list item and not on the content for UIX reasons.

### Happy tagging
The actual tags are tagged themselves using the `data-tag` attribute, which is fully HTML5 compliant. For the items to filter, you could actually supply multiple tags. For that we use the `data-tags` attribute, with a comma-separated list of tags.

### JS
Make sure you've loaded jQuery, Underscore.js, and then *jquery.tagfiltering.js* in your HTML before the plugin call. I personally like to place my scripts file at the end of the body, and using an asynchronous loader for the plugins. You're free to choose though. Call the plugin wrapped in a `$(document).ready(function { })`. This is a sample of the call with all posible options and defaults:

	$("ul.tags").tagfiltering({
		items: ".filter-items",
		active_class: "active"		// css class used to indicate selected tags
	});

Changelog
---------
### v0.2.1
- fixed readme bugs
- tree restructure to separate demo

### v0.2.0
- filtering with multiple tags (disjunctive)
- included demo page
- variable 'active' tag class

### v0.1.0
- added filtering based on single tag
- various other fixes

Roadmap
-------
To add at some point in the future:
- jQuery Quicksand support for nice reorder effects
- optional conjunctive filtering
