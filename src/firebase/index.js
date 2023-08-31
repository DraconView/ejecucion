import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
        apiKey: "AIzaSyC8aFGA_jhjxq8sy8AE9wcNtACLXedVvKQ",
        authDomain: "draconcoffee.firebaseapp.com",
        projectId: "draconcoffee",
        storageBucket: "draconcoffee.appspot.com",
        messagingSenderId: "969340550269",
        appId: "1:969340550269:web:7c28923f750d2853a58514"
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { db, auth, storage };

/*
  apiKey: "AIzaSyC8aFGA_jhjxq8sy8AE9wcNtACLXedVvKQ",
  authDomain: "draconcoffee.firebaseapp.com",
  projectId: "draconcoffee",
  storageBucket: "draconcoffee.appspot.com",
  messagingSenderId: "969340550269",
  appId: "1:969340550269:web:7c28923f750d2853a58514"
  */

  /* SK
  apiKey: "AIzaSyAdy7hu0yCQgdGy1yVMVneqqFMT-gZyCzQ",
  authDomain: "angydracon.firebaseapp.com",
  projectId: "angydracon",
  storageBucket: "angydracon.appspot.com",
  messagingSenderId: "681983723732",
  appId: "1:681983723732:web:2a14081f5ce501f991d341",
  */

/*
         apiKey: "AIzaSyA_NfqB9UkompzjjZ7IzjE4lrmkK1z44wc",
        authDomain: "crud-c7959.firebaseapp.com",
        projectId: "crud-c7959",
        storageBucket: "crud-c7959.appspot.com",
        messagingSenderId: "513289523243",
        appId: "1:513289523243:web:0dc0a8ccc4ae2ed9029a6e"
        */

/*
                apiKey: "AIzaSyAdy7hu0yCQgdGy1yVMVneqqFMT-gZyCzQ",
        authDomain: "angydracon.firebaseapp.com",
        projectId: "angydracon",
        storageBucket: "angydracon.appspot.com",
        messagingSenderId: "681983723732",
        appId: "1:681983723732:web:2a14081f5ce501f991d341"
        */

/*
                apiKey: "AIzaSyAfPKwdSu157A6K2SrwbdI5q8xdpm6Us9Q",
        authDomain: "angystores.firebaseapp.com",
        projectId: "angystores",
        storageBucket: "angystores.appspot.com",
        messagingSenderId: "272099299251",
        appId: "1:272099299251:web:70b4f8441f68862cc605c6"
        */


