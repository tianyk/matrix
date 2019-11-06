'use strict';

import Base from './base.js';

export default class extends Base {
  async __before() {
    this.userInfo = await this.session('userInfo');
    if (this.userInfo) {
      this.assign('user', this.userInfo);
      return Promise.resolve();
    }
    this.redirect('/admin/user');
    return Promise.reject();
  }

  async deleteAction() {
    const {id} = this.get();
    const model = this.model('images');
    const fs = require('fs');

    if (id) {
      const images = await model.where({id: ['in', id]}).select();
      // console.log(images);
      for (var i = 0; i < images.length; i++) {
        const path = think.ROOT_PATH + '/www' + images[i].url;
        // console.log(path);
        if (!/^http(s):\/\//.test(path) && fs.existsSync(path)) {
          fs.unlink(path);
        }
      }
      const affectedRows = await model
        .where({id: ['in', id]})
        .delete();
    }

    return this.redirect('/admin/index/images');
  }

  async uploadAction() {
    const upload = this.service('uploader');

    const file = this.file('file');
    const src = file.path;
    const moment = require('moment');

    const res = await new Promise(async(resolve) => {
      const qcdn = think.config('qcdn');
      const qiniuConf = think.config('qiniu');
      console.log(666, upload);
      const url = await upload.save(src);

      const datetime = moment().format('YYYY-MM-DD HH:mm:ss');

      resolve({
        url: url,
        size: file.size,
        filename: file.name,
        uploadTime: datetime,
        userId: this.userInfo.id
      });
    });

    const model = this.model('images');
    const insertId = await model.add(res);

    if (insertId) {
      return this.json({error: '', url: res.url});
    } else {
      return this.json({error: 'upload error'});
    }
  }
}
