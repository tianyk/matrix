const path = require('path');
const fs = require('fs-extra');
const defaultDeep = require('lodash.defaultsdeep');

const getParser = require('./lib/get-parser');
// parsers
const yamlParser = require('./lib/yaml-parser');

const defaults = require('./defaults');

// 模板
// const template = fs.readFileSync(path.join(__dirname, './template/index.ejs')).toString();
// 这里不要用箭头函数，this 指向问题！
/* eslint-disable space-before-function-paren */
module.exports = function(content) {
/* eslint-enable space-before-function-paren */
  // const {plugins = []} = loaderUtils.getOptions(this);
  const parser = getParser([]);

  const settings = content.split(/<slide.*>/i)[0];

  // 首部 yaml 设置部分
  const globalSettings = defaultDeep(yamlParser(settings), defaults);
  content = parser(content);

  const data = {...globalSettings, content};
  return data;
};
