'use strict';

import Base from './base.js';
const moment = require('moment');

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const model = this.model('slideshare');
    ;
    const slides = await model.field().where({state: 1}).select();
    slides.forEach((item) => {
      item.updateTime = moment(item.updateTime).format('YYYY-MM-DD HH:mm');
    });
    console.log(slides);
    this.assign('slides', slides);
    return this.display();
  }
}
