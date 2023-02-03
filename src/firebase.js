import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyAe19jvlmTk3mU32eGQl6sD1Po1EOKMj40",

  authDomain: "safe-travels-eb65f.firebaseapp.com",

  projectId: "safe-travels-eb65f",

  storageBucket: "safe-travels-eb65f.appspot.com",

  messagingSenderId: "731449455413",

  appId: "1:731449455413:web:25c210995988178f08927c",
};

const firebase = initializeApp(firebaseConfig);

export default firebase;
