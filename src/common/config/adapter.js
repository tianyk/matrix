const fileCache = require('think-cache-file');
const fileSession = require('think-session-file');
const ejs = require('think-view-ejs');

const sqlite = require('think-model-sqlite');

const { Console, File, DateFile } = require('think-logger3');
const path = require('path');
const isDev = think.env === 'development';

/**
 * cache adapter config
 * @type {Object}
 */
exports.cache = {
  type: 'file',
  common: {
    timeout: 1// 24 * 60 * 60 * 1000 // millisecond
  },
  file: {
    handle: fileCache,
    cachePath: path.join(think.ROOT_PATH, 'runtime/cache'), // absoulte path is necessarily required
    pathDepth: 1,
    gcInterval: 1// 24 * 60 * 60 * 1000 // gc interval
  }
};

/**
 * model adapter config
 * @type {Object}
 */
exports.model = {
  type: 'sqlite',
  common: {
    logConnect: isDev,
    logSql: isDev,
    logger: msg => think.logger.info(msg)
  },
  sqlite: {
    handle: sqlite, // Adapter handle
    path: path.join(think.ROOT_PATH, 'runtime/sqlite'), // sqlite 保存的目录
    database: 'matrix', // 数据库名
    encoding: 'utf8',
    connectionLimit: 1, // 连接池的连接个数，默认为 1
    prefix: '' // 数据表前缀，如果一个数据库里有多个项目，那项目之间的数据表可以通过前缀来区分
  }
};

/**
 * session adapter config
 * @type {Object}
 */
exports.session = {
  type: 'file',
  common: {
    cookie: {
      name: 'thinkjs'
      // keys: ['werwer', 'werwer'],
      // signed: true
    }
  },
  file: {
    handle: fileSession,
    sessionPath: path.join(think.ROOT_PATH, 'runtime/session')
  }
};

/**
 * view adapter config
 * @type {Object}
 */
exports.view = {
  type: 'ejs',
  common: {
    viewPath: path.join(think.ROOT_PATH, 'view'),
    extname: '.html',
    sep: '_' // seperator between controller and action
  },
  ejs: {
    // options
    handle: ejs,
    beforeRender: (ejs, handleOptions) => {
      // do something before render the template.
    }
  }
};
/**
 * logger adapter config
 * @type {Object}
 */
exports.logger = {
  type: isDev ? 'console' : 'dateFile',
  console: {
    handle: Console
  },
  file: {
    handle: File,
    backups: 10, // max chunk number
    absolute: true,
    maxLogSize: 50 * 1024, // 50M
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  },
  dateFile: {
    handle: DateFile,
    level: 'ALL',
    absolute: true,
    pattern: '-yyyy-MM-dd',
    alwaysIncludePattern: true,
    filename: path.join(think.ROOT_PATH, 'logs/app.log')
  }
};
