/**
 * @description - @coco-platform/init-cli generated template
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// Native
// Scope
const defaultOptions = {
  verbose: false,
};

class InjectServiceWorkerPlugin {
  constructor(options = {}) {
    this.options = Object.assign({}, defaultOptions, options);
  }

  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('InjectServiceWorker', (compilation) => {
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tapAsync(
        'InjectServiceWorker',
        (structure, callback) => {
          callback(null, structure);
        }
      );
    });
  }
}

module.exports = InjectServiceWorkerPlugin;
