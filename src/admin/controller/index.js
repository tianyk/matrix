'use strict';

import Base from './base.js';

export default class extends Base {
  async __before() {
    this.userInfo = await this.session('userInfo');
    if (this.userInfo) {
      this.assign('user', this.userInfo);
      return true;
    }
    this.redirect('/admin/user');
    return false;
  }

  async indexAction() {
    const page = this.get('page') || 1;
    const num = this.get('num') || 10;
    const q = this.get('q');

    const condition = {
      userId: this.userInfo.id,
      state: ['<>', 2]
    };

    if (q) {
      condition.title = ['like', '%' + q + '%'];
    }

    const model = this.model('slideshare');
    const slides = await model.page(page, num)
      .field('slideshare.id, title, theme, state, updateTime, createTime, content, name')
      .join({
        table: 'user',
        join: 'inner',
        as: 'u',
        on: ['userId', 'u.id']
      })
      .order('createTime DESC')
      .where(condition)
      .countSelect();

    this.assign({
      slides: slides.data || [],
      pages: slides.totalPages,
      page: slides.currentPage
    });
    return this.display();
  }

  async trashAction() {
    const model = this.model('slideshare');
    const page = this.get('page') || 1;
    const num = this.get('num') || 10;

    const slides = await model.page(page, num)
      .field('slideshare.id, title, theme, state, updateTime, createTime, content, name')
      .join({
        table: 'user',
        join: 'inner',
        as: 'u',
        on: ['userId', 'u.id']
      })
      .order('createTime DESC')
      .where({userId: this.userInfo.id, state: ['=', 2]})
      .countSelect();

    this.assign({
      slides: slides.data || [],
      pages: slides.totalPages,
      page: slides.currentPage
    });
    return this.display();
  }

  settingsAction() {
    return this.display();
  }

  async imagesAction() {
    const model = this.model('images');
    const page = this.get('page') || 1;
    const num = this.get('num') || 10;

    const list = await model.page(page, num)
      .where({userId: this.userInfo.id})
      .order('uploadTime DESC')
      .countSelect();

    this.assign({
      list: list.data || [],
      pages: list.totalPages,
      page: list.currentPage
    });

    return this.display();
  }

  async editAction() {
    const {id} = this.get();
    let slide_data = '';

    if (id) {
      const model = this.model('slideshare');
      const slide = await model.where({id: id}).find();
      slide_data = slide;
    }

    this.assign({slide_data});
    return this.display();
  }

  demoAction() {
    return this.display();
  }
}
