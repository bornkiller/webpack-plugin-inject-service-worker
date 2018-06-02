if ('serviceWorker' in navigator) {
  window.addEventListener('load', function() {
    setTimeout(function() {
      navigator.serviceWorker
        .register('SW_PATH', { scope: 'SW_SCOPE' })
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
    }, SW_DELAY);
  });
}
