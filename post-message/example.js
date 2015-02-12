var frame = document.getElementsByTagName('iframe')[0];
frame.onload = function() {
	frame.contentWindow.postMessage('Hello my child!', 'https://macku.github.io');
};


// Wait for receiving greetings
window.addEventListener('message',function(e) {
    if (e.origin === 'https://macku.github.io') {
        if (e.data === 'Hi dad!') {
            console.log('Child says hello!');
        }
    }
});