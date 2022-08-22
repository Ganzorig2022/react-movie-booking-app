import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  setDoc,
  doc,
  getDoc,
  query,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: 'AIzaSyCTnluhlLBvLYVcK5KjgWZ1j4dEAhJuvLw',
  authDomain: 'movie-react-app-f480a.firebaseapp.com',
  projectId: 'movie-react-app-f480a',
  storageBucket: 'movie-react-app-f480a.appspot.com',
  messagingSenderId: '327981915337',
  appId: '1:327981915337:web:099933930ce3947d87c118',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// =========1. Get User Data from FireStore database=============
const getDataFromFireStore = async () => {
  const docData = await query(collection(db, 'userData'));
  const queryData = await getDocs(docData);

  let userDataObj = {};
  let docID = '';
  queryData.forEach((doc) => {
    userDataObj = doc.data();
    docID = doc.id;
  });
  localStorage.setItem('docID', JSON.stringify({ docID: docID }));
  return userDataObj;
};

// =========2. Set User Data To FireStore database=============

const addSeatDataToFireStore = async (seatID, userData, docID) => {
  try {
    const docRef = await doc(db, 'userData', docID);

    updateDoc(docRef, {
      seat: arrayUnion(...seatID),
      userData: arrayUnion({ ...userData }),
    });
  } catch (error) {
    alert(error.message);
  }
};

export { getDataFromFireStore, addSeatDataToFireStore };
