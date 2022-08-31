import { db, app } from '../firebase.config';
import {
  collection,
  getDocs,
  doc,
  query,
  updateDoc,
  arrayUnion,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';

// =========1. Get User Data from FireStore database=============
const useGetDataFromFire = () => {
  const [userDataObj, setUserDataObj] = useState([]);
  const [allOccupiedSeat, setAllOccupiedSeat] = useState([]);
  const [docID, setDocID] = useState('');

  const getData = async () => {
    const docData = await query(collection(db, 'userData'));
    const queryData = await getDocs(docData);

    queryData.forEach((doc) => {
      // 1. save all user seat numbers in array ([2,3,4...etc.])
      setAllOccupiedSeat([...doc.data().seat]);

      // 2. savel all user info in array
      setUserDataObj([...doc.data().userData]);

      // 3. save user UID

      setDocID(doc.id);
    });
  };
  useEffect(() => {
    getData();
  }, []);

  localStorage.setItem('docID', JSON.stringify({ docID: docID }));
  return { userDataObj, allOccupiedSeat };
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

export { useGetDataFromFire, addSeatDataToFireStore };
