window.addEventListener('message', function(e) {
    if (e.origin === 'http://127.0.0.1:8080') {
        if (e.data === 'Hello my child!') {
			console.log('Parent called a child');
            e.source.postMessage('Hi dad!', e.origin);
        }
    }
});