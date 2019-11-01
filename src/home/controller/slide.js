'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async showAction() {
    // auto render template file index_index.html
    const id = this.get('id');
    const model = this.model('slideshare');
    console.log(model);
    const slide = await model.field('title, theme, content, viewCount').where({id: id, state: 1}).find();
    const viewCount = (slide.viewCount + 1);
    await model.where({id: id, state: 1}).update({viewCount});
    this.assign('slide', slide);
    return this.display();
  }
}
