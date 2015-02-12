"use strict";

importScripts('serviceworker-cache-polyfill.js');

console.log('SW Resources: Inside a service worker');

var CACHE_NAME = 'my-cat-site';
var urlsToCache = [
	'/service-worker/demo/',
	'/service-worker/demo/service-worker.js',
	'/service-worker/demo/serviceworker-cache-polyfill.js',
	'/service-worker/demo/index.html',
	'/service-worker/demo/online-offline.js',
	'/service-worker/demo/example.js',
	'/service-worker/demo/xhr.js',
	'/service-worker/demo/styles.css',
	'/service-worker/demo/resources/fallback.json',
	'/service-worker/demo/resources/cat.jpg',
	'/service-worker/demo/resources/sample1.json'
];

self.addEventListener('install', function(event) {
	console.log('SW: Installed');

	event.waitUntil(
		caches.open(CACHE_NAME).then(function(cache) {
			return cache.addAll(urlsToCache);
		})
	);
});

self.addEventListener('activate', function(event) {
	console.log('Activated!');
});

self.addEventListener('fetch', function(event) {
	console.log('Loading...', event.request.url);

	event.respondWith(
		caches.open(CACHE_NAME).then(function(cache) {
			// Dynamic data
			if (event.request.url.match(/resources\/sample2\.json$/)) {
				console.log('Faking JSON!');

				return new Response('{"proxy": true}', {
					headers: {
						"Content-Type": "application/json"
					}
				});
			}

			else if (event.request.url.match(/\.jpg$/i)) {
				console.log('Cat ahead!');

				return fetch('/service-worker/demo/resources/cat.jpg', {
					mode: 'cors'
				});
			}

			else if (event.request.url.match(/^https:\/\/looks\-lile\-\a\-google\.com\//)) {
				console.log('Faking Google');

				return new Response('{"not-a-google": false}', {
					headers: {
						"Content-Type": "application/json"
					}
				});
			}

			// Read from cache
			console.log('in the cache!');

			return cache.match(event.request).then(function(response) {
				if (response) {
					console.log('Loaded form cache', event.request.url);
				}

				return response || fetch(event.request).then(function(response) {
					console.log('Request have been loaded out of cache', event.request.url);

					return response;
				});
			});
		})
	);
});