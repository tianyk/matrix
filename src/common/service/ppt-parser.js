
module.exports = class extends think.Service {
  parse(data) {
    const parse = require('../util/nodeppt-parser/index');
    return parse(data);
  }
}
;
