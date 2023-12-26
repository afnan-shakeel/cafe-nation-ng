import 'tslib';
import { Injectable } from '@angular/core';
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  getDoc,
  updateDoc,
  collection, addDoc, doc, getDocs, query, where, deleteDoc
} from 'firebase/firestore/lite';

const firebaseConfig = {
  apiKey: "AIzaSyC-6ZDq4Q9bX8m5Y6jvMmQ9s6Bq7UOv4t0",
  authDomain: "cafe-nation.firebaseapp.com",
  projectId: "cafe-nation",
  storageBucket: "cafe-nation.appspot.com",
  messagingSenderId: "1004313904082",
  // appId: "1:1004313904082:web:2f5c0d7e3e2d9c5c3c9c6a",
  // measurementId: "G-9RQZC5QZ2D"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const menu_items = collection(db, "menu_items");

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor() { }

  async getMenuData(category: string|null, status: string|null) {
    var q: any
    if (category && status) {
      q = query(menu_items, where("category", "==", category), where("status", "==", status));
    } else if (category) {
      q = query(menu_items, where("category", "==", category));
    } else if (status) {
      q = query(menu_items, where("status", "==", status));
    }else{
      q = query(menu_items);
    }

    const querySnapshot = await getDocs(q);
    const menuDataList: any[] = [];
    querySnapshot.forEach(async (doc) => {
      menuDataList.push({ id: doc.id, ...(doc.data() as any) });
    });
    console.log(menuDataList);
    return menuDataList;
  }
  async addMenuData(data: any) {
    if(data.id){
      console.log("updating");
      const docRef = doc(db, "menu_items", data.id);
      delete data.id;
      await updateDoc(docRef, data);
      return 'updated'
    }
    console.log("adding");
    data.status = 'active';
    delete data.id;
    const docRef = await addDoc(menu_items, data);
    console.log("Document written with ID: ", docRef.id);
    return docRef
  }
  async deleteMenuData(id: string) {
    console.log("deleting");
    const docRef = doc(db, "menu_items", id);
    await deleteDoc(docRef);
    return 'deleted'
  }

}
