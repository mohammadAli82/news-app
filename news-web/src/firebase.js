import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyCEykSmGq3WhBYc1fdcRmP7K6jCohdADfw",
  authDomain: "auth-database-react.firebaseapp.com",
  projectId: "auth-database-react",
  storageBucket: "auth-database-react.appspot.com",
  messagingSenderId: "723196557622",
  appId: "1:723196557622:web:7bc419b7545fc834f61b97"
};
const app = initializeApp(firebaseConfig);
const auth=getAuth(app)
const db=getFirestore(app)
export {db}
export {auth}