// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBshUdT-NTzNrwh-4okarA8LXUKbilIYY0",
  authDomain: "my-portfolio-3683c.firebaseapp.com",
  projectId: "my-portfolio-3683c",
  storageBucket: "my-portfolio-3683c.firebasestorage.app",
  messagingSenderId: "487962289365",
  appId: "1:487962289365:web:42e79c30f267342852ae5c",
  measurementId: "G-J7B0KMWY93"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);