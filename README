tokens
====================

tokens is a jQuery plugin that turns a given div (or the selected elements) into a token container.

Build and install
-----------------

Simply include the plugin js file.

Sample usage
------------

  $(".tokens").tokens({ initialTokens: [{label: 'C++', value: 'cpp'}, {label: 'JSP', value: 'jsp'}],
                            tokensAdded: function(items) {
								for (var i = 0; i < items.length; i++) {
									var item = items[i];
									var html = $("#message").html();
									$("#message").html(html + "<br/>Item added: " + item.value);
								}
							},
                            tokensRemoved: function(items) {
								for (var i = 0; i < items.length; i++) {
									var item = items[i];
									var html = $("#message").html();
									$("#message").html(html + "<br/>Item removed: " + item.value);
								}
							}
	});


