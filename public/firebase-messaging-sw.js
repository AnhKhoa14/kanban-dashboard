importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/10.7.1/firebase-messaging-compat.js"
);

firebase.initializeApp({
  apiKey: "AIzaSyCngaYOenHAan049rfBGxkSrq2CcFiVy1A",
  authDomain: "auth-kanban-cba22.firebaseapp.com",
  projectId: "auth-kanban-cba22",
  storageBucket: "auth-kanban-cba22.firebasestorage.app",
  messagingSenderId: "24077136264",
  appId: "1:24077136264:web:93f4dcad0ee7d035058a3d",
});

const messaging = firebase.messaging();

messaging.onBackgroundMessage((payload) => {
  self.registration.showNotification(payload.notification.title, {
    body: payload.notification.body,
    // icon: "/icon.png",
  });
});
