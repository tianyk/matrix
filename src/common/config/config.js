// default config
module.exports = {
  workers: 1,
  uploader: {
    type: 'file',
    file: {},
    qcdn: {},
    qiniu: {
      access_key: '',
      secret_key: '',
      bucket: '',
      domain: ''
    }
  }
};
