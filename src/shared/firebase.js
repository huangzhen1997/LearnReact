import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';



const firebaseConfig = {
    apiKey: "AIzaSyDhMawwt7dvc0FwFPX5dHZlJzecRVgLCdE",
    authDomain: "learnreact-5aad3.firebaseapp.com",
    databaseURL: "https://learnreact-5aad3.firebaseio.com",
    projectId: "learnreact-5aad3",
    storageBucket: "learnreact-5aad3.appspot.com",
    messagingSenderId: "learnreact-5aad3",
    appID: "learnreact-5aad3",
  };
  
  firebase.initializeApp(firebaseConfig);



  const storage = firebase.storage();

  export {firebase, storage};
