import firebase from "firebase/app";

import 'firebase/auth'
import 'firebase/database'

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID

  // apiKey: "AIzaSyD1UpsPNCgnOvTO_QWSiv3N7g9r7xoQpgE",
  // authDomain: "letmeask-87b25.firebaseapp.com",
  // databaseURL: "https://letmeask-87b25-default-rtdb.firebaseio.com",
  // projectId: "letmeask-87b25",
  // storageBucket: "letmeask-87b25.appspot.com",
  // messagingSenderId: "270286246594",
  // appId: "1:270286246594:web:807d126eba719ff75e215b"

};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const database = firebase.database();

export { firebase, auth, database }

