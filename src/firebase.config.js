import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: 'movie-react-app-f480a',
  storageBucket: 'movie-react-app-f480a.appspot.com',
  messagingSenderId: '327981915337',
  appId: '1:327981915337:web:099933930ce3947d87c118',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export { db, app };
