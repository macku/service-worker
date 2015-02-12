(function(window) {
	var navigator = window.navigator;

	console.log('Are we ussing ServiceWorker?', navigator.serviceWorker.controller ? 'Yes' : 'No');

	navigator.serviceWorker.register('service-worker.js', {
		scope: './'
	}).then(function(registration) {
		// Registration was successful
		console.log('Resources ServiceWorker registration successful with scope: ', registration);

		console.log('Resources ServiceWorker: Ready!');

		// Example 1
		var jsonUrl = '/resources/sample1.json';

		loadXhr(jsonUrl).then(function(json) {
			console.log('#1 Loaded JSON data: ', json);
		}).catch(function(err) {
			console.log('#1 There are problems with loading json: ', err);
		});

		// Example 2
		var jsonUrl = 'resources/sample2.json';

		loadXhr(jsonUrl).then(function(json) {
			console.log('#2 Loaded JSON data: ', json);
		}).catch(function(err) {
			console.log('#2 There are problems with loading json: ', err);
		});

		// Example 3
		var external = 'https://looks-lile-a-google.com/';
		loadXhr(external).then(function(json) {
			console.log('#3 Loaded JSON data: ', json);
		}).catch(function(err) {
			console.log('#3 There are problems with loading json: ', err);
		});


	}).catch(function(err) {
		// registration failed :(
		console.log('Resources ServiceWorker registration failed: ', err);
	});

})(window);