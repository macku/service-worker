(function(window) {
	"use strict";

	var document = window.document;

	var fromArray = function(obj) {
		return [].map.call(obj, function(element) {
			return element;
		});
	};

	var $ = function() {
		return fromArray(
			document.querySelectorAll.apply(document, arguments)
		);
	}

	function onlineOfflineEvent() {
		var online = window.navigator.onLine;
		var onlineText = online ? 'online' : 'offline'
		var onlineColor = online ? 'green' : 'red'

		console.log('%c We are '+onlineText+'!', 'color: '+onlineColor+'; font-size: large');

		$('[data-satus="offline"]').forEach(function(el) {
			el.style.display = online ? 'none' : 'block';
		});

		$('[data-satus="online"]').forEach(function(el) {
			el.style.display = online ? 'block' : 'none';
		});
	};

	window.addEventListener('offline', onlineOfflineEvent);
	window.addEventListener('online',  onlineOfflineEvent);

	onlineOfflineEvent();
})(window);