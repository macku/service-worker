// Init worker
var menAtWork = new Worker("men-working.js");

menAtWork.addEventListener("message", function (e) {
	console.log("We are doing good!", e.data);

	if (e.data === 0) {
		menAtWork.terminate(); // Optional
	}
});
menAtWork.postMessage("Hi, let's do some work!"); // // Start the worker!