var wirelessTap = new SharedWorker("men-talking.js");
wirelessTap.port.addEventListener("message", function(e) {
	console.log("#2 We heard something: ", e.data);
}, false);

wirelessTap.port.start(); // Anonymous