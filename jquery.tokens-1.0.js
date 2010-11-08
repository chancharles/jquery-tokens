/*
 * jQuery Plugin: Tokens
 * Version 1.0
 *
 * https://github.com/chancharles/jquery-tokens
 */
(function($) {

  var constants = {
    dataKey : "tokens",
    tokenDataKey : "tokens-token",
    selectedClass : "selected"
  };

  /**
   * These are public methods.
   */
  var methods = {

    init : function(options) {
      var $selector = this;

      var settings = {
        classes : {
          token : "tokens-token",
          removeToken : "tokens-remove-token"
        },

        renderToken : function(item) {
          var removeTokenHtml = '<span class="' + settings.classes.removeToken + '">x</span>';
          var html = '<span class="' + settings.classes.token + '">'
              + item.label + ' ' + removeTokenHtml + "</span>";
          return html;
        },

        tokensAdded : function(items) {
        },

        tokensRemoved : function(items) {
        },

        initialTokens : []
      };

      // If options exist, lets merge them with our default settings
      if (options) {
        $.extend(settings, options);
      }
      $selector.data(constants.dataKey, {
        settings : settings,
        items : []
      });

      /**
       * Setup live events for the remove token button.
       */
      $("." + settings.classes.removeToken, $selector).live('click',
          function() {
            var $token = $(this).parent("." + settings.classes.token);
            var data = $token.data(constants.tokenDataKey);
            methods.remove.apply($selector, [ [ data ] ]);
            return false;
          });

      /**
       * Setup live events for click on tokens.
       */
      $("." + settings.classes.token, $selector).live('click', function() {
        var item = $(this).data(constants.tokenDataKey);
        methods.select.apply($selector, [ item ]);
        return false;
      });

      /**
       * Initialize the token list with the given items.
       */
      if (settings.initialTokens.length > 0) {
        methods.add.apply($selector, [ settings.initialTokens ]);
      }
      return $selector;
    },

    destroy : function(settings) {
    },

    /**
     * Retrieves the selected items, undefined if none of the items is selected.
     */
    selectedItem : function() {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      var settings = pluginData.settings;
      var $tokens = $("." + settings.classes.token, $selector);
      for ( var i = 0; i < $tokens.length; i++) {
        var $token = $($tokens[i]);
        if ($token.hasClass(constants.selectedClass)) {
          var item = $token.data(constants.tokenDataKey);
          return item;
        }
      }
      return undefined;
    },

    select : function(item) {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      var settings = pluginData.settings;
      var $tokens = $("." + settings.classes.token, $selector);

      var itemValue = item;
      if (typeof item.value != 'undefined' && item.value != null) {
        itemValue = item.value;
      }

      $tokens.removeClass(constants.selectedClass);
      $tokens.each(function() {
        var $token = $(this);
        var eachItem = $token.data(constants.tokenDataKey);
        if (eachItem.value == itemValue) {
          $token.addClass(constants.selectedClass);
        }
      });
    },

    /**
     * Add new tokens. Each item is a map with two keys: label and value. This
     * can be the same object as jQuery UI autocomplete's item.
     */
    add : function(items) {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      var settings = pluginData.settings;
      $.merge(pluginData.items, items);
      /**
       * Invoke callback
       */
      settings.tokensAdded(items);
      return $selector.each(function() {
        var $container = $(this);
        for ( var i = 0; i < items.length; i++) {
          var item = items[i];
          var tokenHtml = settings.renderToken(item);
          var $lastToken = $("." + settings.classes.token, $container).last();
          var $token = undefined;
          /**
           * If we have some tokens, we add the new one to the end of the
           * tokens. Otherwise, we add the new token to the beginning of the
           * div.
           */
          if ($lastToken.length > 0) {
            $token = $(tokenHtml).insertAfter($lastToken);
          } else {
            $token = $(tokenHtml).prependTo($container);
          }
          $token.data(constants.tokenDataKey, item);
        }
      });
    },

    remove : function(items) {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      var settings = pluginData.settings;
      var data = pluginData.items;

      var result = [];
      var removedItems = [];

      for ( var i = 0; i < data.length; i++) {
        var toRemove = false;
        for ( var j = 0; j < items.length; j++) {
          var item = items[j];
          var itemValue = item;
          if (typeof item.value != 'undefined' && item.value != null) {
            itemValue = item.value;
          }

          if (data[i].value == itemValue) {
            toRemove = true;
          }
        }
        if (toRemove) {
          removedItems.push(data[i]);
        } else {
          result.push(data[i]);
        }
      }

      pluginData.items = result;

      /**
       * Invoke callback
       */
      settings.tokensRemoved(removedItems);

      $selector.each(function() {
        var $container = $(this);
        $("." + settings.classes.token, $container).each(function(index) {
          var $token = $(this);
          var item = $token.data(constants.tokenDataKey);

          for ( var i = 0; i < removedItems.length; i++) {
            if (item.value == removedItems[i].value) {
              $token.remove();
            }
          }
        });
      });

      return $selector;
    },

    /**
     * 
     */
    items : function() {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      return pluginData.items;
    },

    values : function() {
      var $selector = this;
      var pluginData = $selector.data(constants.dataKey);
      var values = [];
      for ( var i = 0; i < pluginData.items.length; i++) {
        values.push(pluginData.items[i].value);
      }
      return values;
    }

  };

  $.fn.tokens = function(method) {
    var $selector = this;
    // Method calling logic
    if (methods[method]) {
      return methods[method].apply($selector, Array.prototype.slice.call(
          arguments, 1));
    } else if (typeof method === 'object' || !method) {
      return methods.init.apply($selector, arguments);
    } else {
      $.error('Method ' + method + ' does not exist on jQuery.tokens');
    }
    return $selector;
  }

})(jQuery);

