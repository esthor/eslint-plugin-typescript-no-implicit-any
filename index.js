const noImplicitAnyParams = require("./rules/no-implicit-any-params").default;
// TODO - add each class of implicit any as an optional rule, but default is all of them on.
const rules = { "no-implicit-any-params": noImplicitAnyParams };
module.exports = { rules };
