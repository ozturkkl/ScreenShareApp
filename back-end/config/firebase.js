import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../env.js";

// Initialize Cloud Firestore, Storage through Firebase
import { getStorage, ref, uploadBytes, deleteObject } from "firebase/storage";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
  deleteDoc,
  getDoc,
  doc,
} from "firebase/firestore";

const app = initializeApp(firebaseConfig);

const collectionName = "screenshots";

const db = getFirestore();
const storage = getStorage(app);
const screenshotsRef = ref(storage, collectionName + "/");

export const uploadScreenshot = async (session, buffer) => {
  //-------------- UPLOADING TO FIREBASE STORAGE --------------\\
  const unit8Arr = Uint8Array.from(buffer).buffer;
  const metadata = {
    contentType: "image/png",
  };
  const fileName = ref(screenshotsRef, `${session}-${Date.now()}.png`);
  const doc = await uploadBytes(fileName, unit8Arr, metadata);
  const url = `https://firebasestorage.googleapis.com/v0/b/${
    doc.metadata.bucket
  }/o/${encodeURIComponent(doc.metadata.fullPath)}?alt=media`;
  //-------------- /UPLOADING TO FIREBASE STORAGE --------------\\

  //-------------- UPLOADING TO FIREBASE FIRESTORE --------------\\
  const screenshot = {
    session,
    url,
    fileName: doc.metadata.fullPath,
    timestamp: Date.now(),
  };
  await addDoc(collection(db, collectionName), screenshot);
  //-------------- /UPLOADING TO FIREBASE FIRESTORE --------------\\

  return screenshot;
};

export const getScreenshots = async (session) => {
  const result = [];
  const q = query(
    collection(db, collectionName),
    where("session", "==", session)
  );
  const screenshots = await getDocs(q);
  screenshots.forEach((doc) => result.push({ id: doc.id, ...doc.data() }));

  return result;
};

export const deleteScreenshot = async (id) => {
  const docRef = doc(db, collectionName, id);
  const docSnap = await getDoc(docRef);

  const fileRef = ref(storage, docSnap.data().fileName);
  await deleteObject(fileRef);
  await deleteDoc(doc(db, collectionName, id));
};
