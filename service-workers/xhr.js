function loadXhr(url) {
	return new Promise(function(resolve, reject) {
		var request = new XMLHttpRequest();

		request.open('GET', url, true);

		request.addEventListener('load', function() {
			if (request.readyState === 4 && (request.status >= 200 && request.status < 400)) {
				try {
					var json = JSON.parse(request.responseText);
				}
				catch (e) {
					Error('Problems with proccessing XHR:' + request.responseText);
				}

				resolve(json);
			} else {
				reject(Error('Problems with loading XHR:' + request.statusText));
			}
		});

		request.addEventListener('error', function() {
			reject(Error('There was a network error.'));
		});;

		request.send();
	});
};