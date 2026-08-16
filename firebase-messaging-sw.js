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
  console.log('Mensaje recibido en segundo plano:', payload);

  const title = '🔥 Entre Fuegos';
  const options = {
    body: payload?.notification?.body || 'Tienes un pedido nuevo'
  };

  self.registration.showNotification(title, options);
});
