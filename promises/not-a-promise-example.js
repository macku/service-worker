// Load image
function loadImage(source, success, error) {
	var img = new Image();

	img.addEventListener('load', success);
	img.addEventListener('error', error);

	img.src = source+'?'+Date.now();

	return img;
};

// Load one by one
loadImage('promise.jpg', function() {
	console.log('#1 Loaded image: '+this.src)
}, function() {
	console.log('#1 Failed loading image: '+this.src)
});

loadImage('promise-promise.jpg', function() {
	console.log('#2 Loaded image: '+this.src)
}, function() {
	console.log('#2 Failed loading image: '+this.src)
});


// Load multiple images
(function() {
	var images = ['promise.jpg', 'promise-promise.jpg'];
	var loaded = 0;
	var request = 0
	var success = function() {
		loaded++;

		if (loaded === images.length) {
			console.log('#3 All images were loaded', images);
		}
	}

	var failed = function() {
		if (request === images.length) {
			console.log('#3 One of images failed loading');
		}
	}

	images.forEach(function(source) {
		request++;
		loadImage(source, success, failed);
	});
})();


// Load multiple images
(function() {
	var images = ['promise.jpg', 'missing-one.jpg', 'promise-promise.jpg'];
	var loaded = 0;
	var request = 0

	var success = function() {
		loaded++;

		if (loaded === images.length) {
			console.log('#4 All images were loaded', images);
		}
	}

	var failed = function() {
		if (request === images.length) {
			console.log('#4 One of images failed loading');
		}
	}

	images.forEach(function(source) {
		request++
		loadImage(source, success, failed);
	});
})();

// Load in queue
(function() {
	var images = [
		'promise.jpg',
		'promise-promise.jpg',
		'promise-promise-promise.jpg'
	];

	var getLoadNext = function() {
		var i = 0;

		return function(success, failed) {
			if (i >= images.length) {
				return;
			}

			loadImage(images[i], success, failed);
			i++;
		};
	};

	var loadNext = getLoadNext();
	var loaded = 0;

	var success = function() {
		var num = ++loaded;
		console.log('#5 Loaded '+num+'/'+images.length+': ' +this.src);
		loadNext(success);
	};

	loadNext(success);
})();
