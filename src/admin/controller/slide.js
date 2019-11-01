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

  async saveAction() {
    let { id, title, theme, slide_content: content } = this.post();

    // console.log(title, theme, slide_content);
    const model = this.model('slideshare');
    const moment = require('moment');
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    const record = {
      title,
      theme,
      content,
      updateTime: datetime,
      userId: this.userInfo.id,
      createTime: datetime,
      state: 0
    };
    if (!id) {
      try {
        id = await model.add(record);
      } catch (err) {
        this.json({ err: err.message || 'error' });
      }

      if (id) return this.json({ err: '', id: id });
    } else {
      const affectedRows = await model
        .where({ id: id })
        .update(record)
        .catch(err => this.json({ err: err.message || 'error' }));

      if (affectedRows) return this.json({ err: '', id: id });
    }
  }

  async deleteAction() {
    const { id } = this.get();
    const model = this.model('slideshare');
    const moment = require('moment');
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (id) {
      const affectedRows = await model
        .where({ id: ['in', id] })
        .update({ state: 2, updateTime: datetime });
    }

    return this.redirect('/admin');
  }

  async recoverAction() {
    const { id } = this.get();
    const model = this.model('slideshare');
    const moment = require('moment');
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (id) {
      const affectedRows = await model
        .where({ id: ['in', id] })
        .update({ state: 0, updateTime: datetime });
    }

    return this.redirect('/admin/index/trash');
  }

  async publishAction() {
    const { id } = this.get();
    const model = this.model('slideshare');
    const moment = require('moment');
    const datetime = moment().format('YYYY-MM-DD HH:mm:ss');

    if (id) {
      const data = await model.where({ id }).find();
      if (data) {
        // console.log(data);
        const affectedRows = await model
          .where({ id: ['in', id] })
          .update({ state: 0 | !data.state, updateTime: datetime });
      }
    }

    return this.redirect('/admin');
  }

  async destoryAction() {
    const { id } = this.get();
    const model = this.model('slideshare');

    if (id) {
      const affectedRows = await model.where({ id: ['in', id] }).delete();
    }

    return this.redirect('/admin/index/trash');
  }

  async previewAction() {
    const { id } = this.get();
    if (id) {
      const model = this.model('slideshare');
      const slide = await model.where({ id }).find();
      // console.log(slide);
      this.assign({ slide });
    }
    return this.display();
  }
}
