import { serverTimestamp } from "firebase/firestore";
import { db } from "@/app/config/firebase";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    setDoc,
    updateDoc,
    doc,
    query,
    where,
    orderBy,
    deleteDoc,
} from "@firebase/firestore";

// ************************* create one group*****************************

export const checkGroup = async (groupId) => {
    try {
        const groupDocRef = doc(db, "usersCollection", groupId);
        const groupDocSnap = await getDoc(groupDocRef);
        if (groupDocSnap.exists()) {
            console.log("group already exists");
            return true;
        }
        return false;
    } catch (error) {
        console.log("error checking group", error);
        throw error;
    }
};
export const createGroup = async (groupId, usernames) => {
    try {
        if (await checkGroup(groupId)) {
            console.log("this collection already exists...");
            return false;
        }
        const groupDocRef = doc(db, "usersCollection", groupId);
        const groupDocSnap = await setDoc(groupDocRef, { usernames });
        // console.log("collection created successfully")
        return true;
    } catch (error) {
        console.log("error creating group", error);
        throw error;
    }
};
// fetch data of a given groupId
export const fetchUsernames = async (groupId) => {
    try {
        if (!(await checkGroup(groupId))) {
            console.log("This collection does not exist...");
            return null;
        }
        // console.log("server: groupId", groupId);
        const groupDocRef = doc(db, "usersCollection", groupId);
        const groupDocSnap = await getDoc(groupDocRef);

        console.log("data", groupDocSnap.data());
        return groupDocSnap.data();
    } catch (error) {
        console.log("Error fetching usernames:", error);
        throw error;
    }
};

export const updateViews = async () => {
    try {
        const docRef = doc(db, "viewsCollection", "views");
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            const newViews = docSnap.data().views + 1;
            await updateDoc(docRef, {
                views: newViews,
            });
            console.log("views updated successfully");
            return newViews;
        } else {
            console.log("No such document!");
            return 0;
        }
    } catch (error) {
        console.log("error updating views", error);
        throw error;
    }
};
