const path = require('path');
const rootPath = path.normalize(__dirname + "/../");


const configurations = {

  development: {
    port: process.env.PORT || 3000,
    rootPath: rootPath,
    logStyle: 'dev',
    API_DIR: '/APIs',
    VALIDATOR_DIR: '/Validators',
  },

  production: {
    port: process.env.PORT || 3000,
    rootPath: rootPath,
    logStyle: 'combined',
    API_DIR: '/APIs',
    VALIDATOR_DIR: '/Validators',
  },
};


function returnConfiguration(env) {
  return configurations[env];
}

module.exports = returnConfiguration;