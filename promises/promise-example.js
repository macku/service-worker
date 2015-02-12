// Load image
function loadImage(source) {
	var promise = new Promise(function(resolve, reject) {
		var img = new Image();

		img.addEventListener('load', function() {
			resolve(source);
		});
		img.addEventListener('error', function() {
			reject(source);
		});

		img.src = source+'?'+Date.now();

		return img;
	});

	return promise;
};

// Load one by one
loadImage('promise.jpg').then(function(source) {
	console.log('#1 Loaded image: '+source);
}).catch(function() {
	console.log('#1 Failed loading image: '+source)
});

loadImage('promise-promise.jpg').then(function(source) {
	console.log('#2 Loaded image: '+source);
}).catch(function() {
	console.log('#2 Failed loading image: '+source)
});

// Load multiple images
Promise.all([
	loadImage('promise.jpg'),
	loadImage('promise-promise.jpg')
]).then(function(images) {
	console.log('#3 All images were loaded', images);
}).catch(function(images) {
	console.log('#3 One of images failed loading');
});

// Load multiple images ?
Promise.all([
	loadImage('promise.jpg'),
	loadImage('missing-one.jpg'),
	loadImage('promise-promise.jpg'),
]).then(function(images) {
	console.log('#4 All images were loaded', images);
}).catch(function(images) {
	console.log('#4 One of images failed loading');
});

// Load in queue
loadImage('promise.jpg').then(function(source) {
	console.log('#5 Loaded 1/3: ' +source);

	return loadImage('promise-promise.jpg');
}).then(function(source) {
	console.log('#5 Loaded 2/3: ' +source);

	return loadImage('promise-promise-promise.jpg');
}).then(function(source) {
	console.log('#5 Loaded 3/3: ' +source);
});


// Load in queue by reference
var images = [
	'promise.jpg',
	'promise-promise.jpg',
	'promise-promise-promise.jpg'
];

var loadNext = function() {
	var i = 0;
	var onResolve = function(source) {
		var num = ++i;

		console.log('#6 Loaded '+num+'/'+images.length+': ' +source);

		if (i === images.length) {
			return;
		}

		return loadImage(images[i]).then(onResolve);
	};

	return loadImage(images[i]).then(onResolve);
}

loadNext();