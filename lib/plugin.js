/**
 * @description - inject service worker register code
 * @author - huang.jian <hjj491229492@hotmail.com>
 */

// package
const path = require('path');
const fs = require('fs');

// scope
const defaultOptions = {
  swScope: '/',
  swPath: 'sw.js',
  swDelay: 200,
};
const template = path.resolve(__dirname, 'template.js');
const content = fs.readFileSync(template, { encoding: 'utf8' });

class InjectServiceWorkerPlugin {
  constructor(options = {}) {
    this.options = { ...defaultOptions, ...options };
  }

  // eslint-disable-next-line class-methods-use-this
  apply(compiler) {
    compiler.hooks.compilation.tap('InjectServiceWorker', (compilation) => {
      compilation.hooks.htmlWebpackPluginAlterAssetTags.tapAsync(
        'InjectServiceWorker',
        (structure, callback) => {
          const { swPath, swScope, swDelay } = this.options;
          const code = content
            .replace('SW_PATH', swPath)
            .replace('SW_SCOPE', swScope)
            .replace('SW_DELAY', swDelay);
          const ast = {
            tagName: 'script',
            closeTag: true,
            innerHTML: code,
          };

          callback(null, { ...structure, head: [...structure.head, ast] });
        }
      );
    });
  }
}

module.exports = InjectServiceWorkerPlugin;
