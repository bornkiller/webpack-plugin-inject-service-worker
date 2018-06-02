# @coco-platform/webpack-plugin-inject-service-worker

![Build Status](https://img.shields.io/travis/coco-platform/webpack-plugin-inject-service-worker/master.svg?style=flat)
[![Coverage Status](https://coveralls.io/repos/github/coco-platform/webpack-plugin-inject-service-worker/badge.svg?branch=master)](https://coveralls.io/github/coco-platform/webpack-plugin-inject-service-worker?branch=master)
![Package Dependency](https://david-dm.org/coco-platform/webpack-plugin-inject-service-worker.svg?style=flat)
![Package DevDependency](https://david-dm.org/coco-platform/webpack-plugin-inject-service-worker/dev-status.svg?style=flat)

## Usage

```shell
# npm
npm install @coco-platform/webpack-plugin-inject-service-worker --only=dev;
# yarn
yarn add @coco-platform/webpack-plugin-inject-service-worker --dev;
```

## Options

### options.swScope

Optional, default `/`, indicated the service worker register scope.

### options.swPath

Optional, default `sw.js`, indicated service worker file path.

### options.swDelay

Optional, time delay to register service worker.

## Example

Then config the webpack:

```javascript
const configuration = {
  entry: path.resolve(__dirname, '__fixture__', 'index.js'),
  resolve: {
    extensions: ['.js', '.css'],
  },
  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },
  module: {
    rules: [],
  },
  plugins: [
    Reflect.construct(HtmlWebpackPlugin, [
      {
        template: path.resolve(__dirname, '__fixture__', 'index.html'),
        inject: 'body',
      },
    ]),
    Reflect.construct(InjectServiceWorkerPlugin, []),
  ],
};
```

Finally output:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Webpack Plugin</title>
    <script>
      if ('serviceWorker' in navigator) {
        window.addEventListener('load', function() {
          setTimeout(function() {
            navigator.serviceWorker
              .register('sw.js', { scope: '/' })
              .then(function(registration) {
                // Registration was successful
                console.log(
                  'ServiceWorker registration successful with scope: ',
                  registration.scope
                );
              })
              .catch(function(err) {
                // registration failed :(
                console.log('ServiceWorker registration failed: ', err);
              });
          }, 200);
        });
      }
    </script>
  </head>
  <body>
    <script type="text/javascript" src="/main.js"></script>
  </body>
</html>
```

## License

MIT
