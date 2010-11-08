tokens
====================

tokens is a jQuery plugin that turns a given div (or the selected elements) into a token container.

Build and install
-----------------

Simply include the plugin js file.

Sample usage
------------

    // initialize the token container with two tokens.
    $(".tokens").tokens({ 
        initialTokens: [{label: 'C++', value: 'cpp'}, {label: 'JSP', value: 'jsp'}]
    });

    // add two new tokens
    $(".tokens").tokens("add", [{label: 'Java', value: 'java'}, {label: 'PHP', value: 'php'}]);

    // remove two tokens
    $(".tokens").tokens("remove", [{label: 'Java', value: 'java'}, {label: 'C++', value: 'cpp'}]);
    
    // or equivalently, just provide the value
    $(".tokens").tokens("remove", ['java', 'cpp']);

    // select a token
    $(".tokens").tokens("select", [{label: 'C++', value: 'cpp'}]);

    // or equivalently, just provide the value
    $(".tokens").tokens("select", ['cpp']);

    // retrieve list of items from the token container
    var items = $(".tokens").tokens("items");

    // retrieve only item values from the token container
    var values = $(".tokens").tokens("values");

    