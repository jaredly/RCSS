var cascade = require('./cascade');
var registerClass = require('./registerClass');
var styleRuleConverter = require('./styleRuleConverter');

function descriptorsToString(styleDescriptor) {
  return styleRuleConverter.rulesToString(
    styleDescriptor.className,
    styleDescriptor.style
  );
}

module.exports = function makeRegistry(base, attr) {
  base[attr] = base[attr] || {}

  var RCSS = {
    cascade: cascade,
    registerClass: registerClass.bind(null, base, attr),

    injectAll: function() {
      var tag = document.createElement('style');
      tag.innerHTML = RCSS.getStylesString();
      document.getElementsByTagName('head')[0].appendChild(tag);
    },

    getStylesString: function() {
      var registry = base[attr]
      var str = '';
      for (var key in registry) {
        if (!registry.hasOwnProperty(key)) {
          continue;
        }
        str += descriptorsToString(registry[key]);
      }
      base[attr] = {}
      return str;
    }
  };
  return RCSS
}
