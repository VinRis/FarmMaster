import { db } from './firebase-config.js';
import { collection, addDoc, query, where, getDocs, orderBy } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// Helper to get collection reference based on user and farm type
const getCollectionRef = (userId, collectionName) => {
    // Structure: users/{userId}/records
    return collection(db, `users/${userId}/${collectionName}`);
};

export const addRecord = async (userId, data) => {
    try {
        // data should include: { type: 'finance', farmType: 'dairy', amount: 100, date: '...', etc. }
        const docRef = await addDoc(getCollectionRef(userId, 'records'), data);
        console.log("Document written with ID: ", docRef.id);
        return true;
    } catch (e) {
        console.error("Error adding document: ", e);
        return false;
    }
};

export const getRecords = async (userId, farmType, recordType = null) => {
    let q = query(
        getCollectionRef(userId, 'records'), 
        where("farmType", "==", farmType),
        orderBy("date", "desc")
    );
    
    // If recordType is provided (e.g., 'finance' or 'health'), filter by it
    if (recordType) {
        q = query(q, where("category", "==", recordType));
    }

    const querySnapshot = await getDocs(q);
    let records = [];
    querySnapshot.forEach((doc) => {
        records.push({ id: doc.id, ...doc.data() });
    });
    return records;
};
