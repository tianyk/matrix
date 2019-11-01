'use strict';

export default class extends think.Service {
  async save(opts, src) {
    const url = '/static/upload/' + require('path').parse(src).base;

    const des = think.RESOURCE_PATH + url;

    const fs = require('fs');

    await new Promise((resolve, reject) => {
      const uploadDir = think.RESOURCE_PATH + '/static/upload';
      fs.stat(uploadDir, (err, st) => {
        if (err) {
          fs.mkdirSync(uploadDir, 0o777);
        }
        resolve();
      });
    });

    const readStream = fs.createReadStream(src);
    const writeStream = fs.createWriteStream(des);

    readStream.pipe(writeStream);

    return new Promise((resolve, reject) => {
      readStream.on('end', () => {
        writeStream.end();
        resolve(url);
      });
    });
  }
}
