var sha1 = require('sha1');

function hashStyle(styleObj) {
  return sha1(JSON.stringify(styleObj));
}

function generateValidCSSClassName(styleId) {
  // CSS classNames can't start with a number.
  return 'c' + styleId;
}

function registerClass(base, attr, styleObj) {
  var styleId = generateValidCSSClassName(hashStyle(styleObj));

  if (base[attr][styleId] == null) {
    base[attr][styleId] = {
      className: styleId,
      style: styleObj
    };
  }

  // Simple shallow clone
  styleObj = base[attr][styleId];
  return {
    className: styleObj.className,
    style: styleObj.style
  };
}

module.exports = registerClass;
