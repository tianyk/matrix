'use strict';

import Base from './base.js';
import { sign } from 'crypto';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  async indexAction() {
    // auto render template file index_index.html
    const userInfo = await this.session('userInfo');
    if (userInfo) {
      this.redirect('/admin');
    } else {
      return this.display();
    }
  }
  async loginAction() {
    const { username, passwd, signup } = this.post();
    // console.log(username, passwd, remember);
    if (username && passwd) {
      const model = this.model('user');
      const user = await model.where({ name: username }).find();
      console.log(888, signup);
      const isSignupNewUser = signup && !user.name;
      const isSignupExistUser = signup && user.name;
      if (isSignupNewUser) {
        await model.add({name: username, passwd: think.md5(passwd)});
        // this.ctx.set('msg', 'sign up success'); // 给模板赋值

        return this.json({msg: 'sign up success', code: 1});
      }
      if (isSignupExistUser) {
        return this.json({msg: 'user  exist', code: 2});
      }
      console.log(think.md5(passwd), '---', user.passwd);
      if (user.name === username && user.passwd === think.md5(passwd)) {
        console.log('login......');
        await this.session('userInfo', user);
        return this.json({msg: 'login success', code: 3});
        // return this.redirect('/admin');
      }console.log('not login.......');
    }

    return this.json({msg: 'username or passwd error', code: 4});
  }
  async logoutAction() {
    await this.session('userInfo', '');
    return this.redirect('/admin/user');
  }

  async passwdAction() {
    const userInfo = await this.session('userInfo');
    if (!userInfo) {
      return this.redirect('/admin/user');
    }
    const { pwd, pwd2 } = this.post();

    const result = { validate_result: 'error' };

    if (pwd === pwd2) {
      const model = this.model('user');
      const passwd = think.md5(pwd);
      const affectedRows = await model
        .where({ name: userInfo.name })
        .update({ passwd: passwd });
      // console.log(affectedRows);
      if (affectedRows) {
        userInfo.passwd = passwd;
        await this.session('userInfo', userInfo);

        this.assign({ validate_result: 'success' });
      }
    }

    return this.action('admin/index', 'settings');
  }
}
