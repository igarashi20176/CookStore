import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAUvOyAGMHgPX5cVlL3Uj-L6gXxnAxbq0I",
  authDomain: "moviewer-e9b49.firebaseapp.com",
  projectId: "moviewer-e9b49",
  storageBucket: "moviewer-e9b49.appspot.com",
  messagingSenderId: "471626273404",
  appId: "1:471626273404:web:3cd4794e1f49a074a76ff9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const storage = getStorage(app)

export {
  auth,
  storage
}