'use strict';
/**
 * model
 */
export default class extends think.Model {
  get relation() {
    return {
      user: {
        type: think.Model.BELONG_TO,
        key: 'userId'
      }
    };
  }
}
