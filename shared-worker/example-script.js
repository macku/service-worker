var talkativeMen = new SharedWorker("men-talking.js");
talkativeMen.port.addEventListener("message", function(e) {
	console.log("#1: They are talking about: ", e.data);
}, false);

talkativeMen.port.postMessage("Hello!");
talkativeMen.port.postMessage("My name is Maciek");
talkativeMen.port.postMessage("I just want to listen");


talkativeMen.port.start();