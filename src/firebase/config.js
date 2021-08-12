import firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

import {API_KEY, MESSAGING_SENDER_ID} from '@env'

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: 'engvalley.firebaseapp.com',
  databaseURL: 'https://engvalley-default-rtdb.europe-west1.firebasedatabase.app/',
  projectId: 'engvalley',
  storageBucket: 'engvalley.appspot.com',
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: 'test',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

export { firebase };
