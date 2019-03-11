
import firebase from 'firebase'


// Initialize Firebase
let config = {
    apiKey: "AIzaSyBKUpUdX3QqZMFgdgHgqisvxeDFeCToHc4",
    authDomain: "sappy-pro.firebaseapp.com",
    databaseURL: "https://sappy-pro.firebaseio.com",
    projectId: "sappy-pro",
    storageBucket: "sappy-pro.appspot.com",
    messagingSenderId: "818581894601"
};
firebase.initializeApp(config);

export default firebase;