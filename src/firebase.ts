import { getFirestore } from "firebase/firestore";
import { initializeApp } from "firebase/app";

//const firebaseConfig = {
  //   // COPY this from your Firebase Console
  //   apiKey: "your-api-key-goes-here",
  //   authDomain: "your-project-name-here.firebaseapp.com",
  //   databaseURL: "https://your-project-name-here.firebaseio.com",
  //   projectId: "your-project-name-here",
  //   storageBucket: "your-project-name.appspot.com",
  //   messagingSenderId: "xxxxxxxx",
//};

const firebaseConfig = {
  apiKey: "AIzaSyAiu9JFruHnV4nNSdutMmM1DzjvtWukxXo",
  authDomain: "cis371-ee861.firebaseapp.com",
  projectId: "cis371-ee861",
  storageBucket: "cis371-ee861.firebasestorage.app",
  messagingSenderId: "628607970460",
  appId: "1:628607970460:web:455403ef741bba35d49159",
  measurementId: "G-2G0CDQP4J8"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
