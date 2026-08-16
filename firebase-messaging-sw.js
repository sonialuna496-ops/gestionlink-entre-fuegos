importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.5/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAoAc9IIggSXbunRcHuEU6MuzeUCDH88Uo",
  authDomain: "gestionlink-entre-fuegos-2.firebaseapp.com",
  projectId: "gestionlink-entre-fuegos-2",
  storageBucket: "gestionlink-entre-fuegos-2.firebasestorage.app",
  messagingSenderId: "496848285254",
  appId: "1:496848285254:web:781f82bb067c25258ce447"
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Notificación recibida:', payload);

  const notificationTitle =
    payload.notification?.title ||
    payload.data?.title ||
    '🔥 ENTRE FUEGOS';

  const notificationOptions = {
    body:
      payload.notification?.body ||
      payload.data?.body ||
      'Tienes una nueva notificación',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [300, 100, 300, 100, 500],
    requireInteraction: true,
    tag: payload.data?.tag || 'gestionlink-alerta',
    data: {
      url: payload.data?.url || '/'
    }
  };

  return self.registration.showNotification(
    notificationTitle,
    notificationOptions
  );
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const url = event.notification.data?.url || '/';

  event.waitUntil(
    clients.matchAll({
      type: 'window',
      includeUncontrolled: true
    }).then((clientList) => {
      for (const client of clientList) {
        if ('focus' in client) {
          client.navigate(url);
          return client.focus();
        }
      }

      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});
