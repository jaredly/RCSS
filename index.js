
var global = Function("return this")();
var makeRegistry = require('./registry')

module.exports = makeRegistry(global, '__RCSS_0_registry')
