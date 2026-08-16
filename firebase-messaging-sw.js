importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.13.2/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyAoAc9IIggSXbunRcHuEU6MuzeUCDH88Uo",
  authDomain: "gestionlink-entre-fuegos-2.firebaseapp.com",
  projectId: "gestionlink-entre-fuegos-2",
  storageBucket: "gestionlink-entre-fuegos-2.firebasestorage.app",
  messagingSenderId: "496848285254",
  appId: "1:496848285254:web:781f82bb067c25258ce447"
});

const messaging=firebase.messaging();

messaging.onBackgroundMessage((payload)=>{
  const d=payload.data||{};
  self.registration.showNotification(d.title||'🔥 GestiónLink · Entre Fuegos',{
    body:d.body||'Tienes una actualización de pedido.',
    tag:d.tag||'gestionlink',
    renotify:true,
    vibrate:[400,120,400,120,650],
    data:{url:d.url||'/'}
  });
});

self.addEventListener('notificationclick',(event)=>{
  event.notification.close();
  const url=event.notification.data?.url||'/';
  event.waitUntil(
    clients.matchAll({type:'window',includeUncontrolled:true}).then((list)=>{
      for(const c of list){
        if('focus' in c){c.navigate(url);return c.focus();}
      }
      if(clients.openWindow)return clients.openWindow(url);
    })
  );
});
