const replace = require('@rollup/plugin-replace');

module.exports = {
  rollup(config, options) {
    config.plugins = config.plugins.map((plugin) => {
      if (plugin && plugin.name === 'replace') {
        return replace({
          ...plugin.options,
          preventAssignment: true,
        });
      }
      return plugin;
    });

    return config;
  },
};
