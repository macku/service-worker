self.addEventListener("message", function(e) {
	if (e.data === "Hi, let's do some work!") {
		var limit = 1000000000;
		while (limit--) {
			if (limit % 100000000 === 0) {
				self.postMessage(limit); // Notify the boss about progress
			}
		}

		close(); // Optional
	}
}, false);