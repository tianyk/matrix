'use strict';

export default class extends think.Service {
  saveFile(opts, src) {
    const qiniu = require('node-qiniu');
    qiniu.config({
      access_key: opts.access_key,
      secret_key: opts.secret_key
    });

    const bucket = qiniu.bucket(opts.bucket);

    const des = 'matrix/' + require('path').parse(src).base;

    return new Promise((resolve, reject) => {
      bucket.putFile(des, src, (err, reply) => {
        if (!err) {
          const url = opts.domain + '/' + des;
          resolve(url);
        }else {
          reject(err);
        }
      });
    });
  }
}
