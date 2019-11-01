'use strict';

export default class extends think.Service {
  qcdn(opts, src) {
    const qcdn = require('qcdn');
    return qcdn(src);
  }
}
