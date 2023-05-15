module.exports = function override(config, env) {

    config.externals = [ 'electron' ]
    config.plugins.forEach((plugin) => {
        if (plugin.constructor.name === 'DefinePlugin') {
          plugin.definitions['process.env']['electron'] = JSON.stringify('electron');
        }
      });

      return config;
    return config;
  };
