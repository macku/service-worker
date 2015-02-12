window.addEventListener('message', function(e) {
    if (e.origin === 'https://macku.github.io') {
        if (e.data === 'Hello my child!') {
			console.log('Parent called a child');
            e.source.postMessage('Hi dad!', e.origin);
        }
    }
});