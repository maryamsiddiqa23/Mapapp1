// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCm78Ps1vIG4xpebgu2Dk3Uvm79R8jXwZk",
    authDomain: "maps-38d57.firebaseapp.com",
    projectId: "maps-38d57",
    storageBucket: "maps-38d57.appspot.com",
    messagingSenderId: "72521286021",
    appId: "1:72521286021:web:e2aab0133d4f11354644ec",
    measurementId: "G-XY5GS6F8L9"
  };

// Initialize Firebase
export const dbApp = initializeApp(firebaseConfig);
export const db = getFirestore(dbApp);

export default dbApp;

export const addCollection = () => {
  const usersCollectionRef = collection(db, 'locations');
  console.log('collection created');
};