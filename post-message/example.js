var frame = document.getElementsByTagName('iframe')[0];
frame.onload = function() {
	frame.contentWindow.postMessage('Hello my child!', 'http://127.0.0.10:1234');
};


// Wait for receiving greetings
window.addEventListener('message',function(e) {
    if (e.origin === 'http://127.0.0.10:1234') {
        if (e.data === 'Hi dad!') {
            console.log('Child says hello!');
        }
    }
});