self.addEventListener('push', function (event) {

    const title ='<%= project.lower %>';
    const notificationOptions = {
        body: event.data,
        icon: './images/logo-large.png',
        dir: 'auto',
        delay: 20000,
        focusWindowOnClick: true,
        vibrate: [100, 100, 100, 100, 100]
    };
    self.registration.showNotification(title, notificationOptions);

});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    event.waitUntil(
            clients.matchAll({
                type: "window"
            })
            .then(function (clientList) {
                for (var i = 0; i < clientList.length; i++) {
                    var client = clientList[i];
                    if (client.url === '/' && 'focus' in client)
                        return client.focus();
                }
                if (clients.openWindow) {
                    return clients.openWindow('/');
                }
            })
            );

});



self.addEventListener('message', function (event) {

    const title = '<%= project.lower %>';
    const notificationOptions = {
        body: event.data,
        icon: './images/logo-large.png',
        dir: 'auto',
        delay: 20000,
        focusWindowOnClick: true,
        vibrate: [100, 100, 100, 100, 100]
    };
    self.registration.showNotification(title, notificationOptions);

});
