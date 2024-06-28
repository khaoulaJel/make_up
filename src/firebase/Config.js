import  firebase  from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCOqG9bUKu_3iKRR0ym5j_WOUyoFw561oQ",
  authDomain: "ratt-27.firebaseapp.com",
  projectId: "ratt-27",
  storageBucket: "ratt-27.appspot.com",
  messagingSenderId: "488910907351",
  appId: "1:488910907351:web:f7b7f715ea44e0f5638d92"
};

firebase.initializeApp(firebaseConfig);
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

export { projectFirestore, projectAuth };
