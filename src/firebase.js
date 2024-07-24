import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyADWv5Jr7AkMXGISObMl4H1lPZnX6khl3g",
  authDomain: "ecrit-9163e.firebaseapp.com",
  projectId: "ecrit-9163e",
  storageBucket: "ecrit-9163e.appspot.com",
  messagingSenderId: "379337343319",
  appId: "1:379337343319:web:b2e570237db1931080be12",
  measurementId: "G-GPN38TQJT2"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app)

export { auth }