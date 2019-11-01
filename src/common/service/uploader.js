'use strict';

export default class extends think.Service {
  /**
    {
      type:'qiniu',
      qiniu:{
          ...
      },
      file: {},
      qcdn: {}
    }
   */
  getInstance() {
    const conf = think.config('uploader');
    const instance = require(__dirname + '/uploaders/' + conf.type).default.bind(null, conf[conf.type]);

    return instance;
  }
}
