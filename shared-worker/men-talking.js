var ports = [];

self.addEventListener("connect", function(e) { // Connect
	var port = e.ports[0];
	ports.push(port);

	port.addEventListener("message", function(e) { // Wait for joining discussion
		ports.forEach(function(p, i) {
			p.postMessage("We're just gossiping... (port #" + i + ")");
		});
	}, false);

	port.start();
}, false);