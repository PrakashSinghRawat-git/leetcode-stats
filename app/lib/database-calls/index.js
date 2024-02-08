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

// export const createDealer = async (dealerObj) => {
//     // Add createdAt field to the dealer object
//     const carLeadWithTimestamp = {
//         ...dealerObj,
//         createdAt: serverTimestamp(), // Add the server timestamp to createdAt field
//     };

//     try {
//         const postRef = await addDoc(
//             collection(db, "dealersData"),
//             carLeadWithTimestamp
//         );
//         return postRef.id; // Return the newly created document
//     } catch (error) {
//         console.error("Error creating dealer: ", error);
//         throw error;
//     }
// };

// // ****************************** INSPECTIN REPORT ROUTES *******************************

// // Function to fetch all reports from Firestore
// export const fetchAllReports = async () => {
//     try {
//         const inspectionData = [];
//         const carsRef = collection(db, "carsInspectionData");
//         const querySnapshot = await getDocs(carsRef);

//         querySnapshot.forEach((doc) => {
//             inspectionData.push({ id: doc.id, ...doc.data() });
//         });

//         return inspectionData;
//     } catch (error) {
//         console.error("Error fetching inspections data: ", error);
//         return [];
//     }
// };

// // fetchOneReport from firebase
// export const fetchOneReport = async (postId) => {
//     try {
//         const reportRef = doc(db, "carsInspectionData", postId);

//         const reportSnapshot = await getDoc(reportRef);

//         if (reportSnapshot.exists()) {
//             return { id: reportSnapshot.id, ...reportSnapshot.data() };
//         } else {
//             return null;
//         }
//     } catch (error) {
//         console.error("Error fetching post by ID: ", error);
//         return null; // You can handle errors appropriately in your application
//     }
// };

// // update report with given id
// // update QC Status
// export const updateOneReport = async (id, field, value) => {
//     try {
//         const reportRef = doc(db, "carsInspectionData", id);
//         await updateDoc(reportRef, { [field]: value });

//         return value;
//     } catch (error) {
//         console.log("error updating report field...", error);
//         throw error;
//     }
// };

// export const deleteOneReport = async (id) => {
//     try {
//         const reportRef = doc(db, "carsInspectionData", id);
//         await deleteDoc(reportRef);
//         return true;
//     } catch (error) {
//         console.log("error deleting report");
//         throw error;
//     }
// };
// // ****************************** AUCTIONS ROUTES *******************************

// // fetching all post with isAuctionLive=true
// export const getLiveAuctions = async (email) => {
//     try {
//         const reportRef = collection(db, "carsInspectionData");
//         const q = query(reportRef, where("isAuctionLive", "==", true));
//         const querySnapshot = await getDocs(q);

//         if (querySnapshot.empty) {
//             console.log("reports do not exist");
//             return null;
//         } else {
//             const data = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(), // Extract the document data
//             }));
//             console.log("reports with live auction are: ", data);
//             return data;
//         }
//     } catch (error) {
//         console.log("error getting user", error);
//         throw error;
//     }
// };

// // update QC Status
// export const updateQCStatus = async (id, value) => {
//     try {
//         const reportRef = doc(db, "carsInspectionData", id);
//         const res = await updateDoc(reportRef, { qcStatus: value });
//         console.log("qc status updated successfully", res);
//         return res;
//     } catch (error) {
//         console.log("error updating qc status...", error);
//         throw error;
//     }
// };
