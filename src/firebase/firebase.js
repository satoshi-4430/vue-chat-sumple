import firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyDluVVEhui2CXZVX08fSjO9P-e2Ja9-lXo",
    authDomain: "vue-chat-3955f.firebaseapp.com",
    projectId: "vue-chat-3955f",
    storageBucket: "vue-chat-3955f.appspot.com",
    messagingSenderId: "958375774593",
    appId: "1:958375774593:web:7ef5ab25a91dc99e6ec080"
  };
  
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase;