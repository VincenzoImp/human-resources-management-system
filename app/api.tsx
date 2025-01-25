"use client";

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { db, storage } from "@/app/firebase/config";
import { Employee } from "@/app/context";
import { v4 as uuidv4 } from "uuid";

async function readPermissions(uid: string) {
    const docRef = doc(db, "settings", "permissions");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const permissions = docSnap.data() as Record<string, string[]>;
        return {
            write: permissions.writers.includes(uid)
        };
    }
    return null;
}

async function readEmployees() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = new Array<Employee>();
    querySnapshot.forEach(doc => {
        const employee = doc.data() as Employee;
        employee.id = doc.id;
        employees.push(employee);
    });
    return employees;
}

async function readEmployee(id: string) {
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const employee = docSnap.data() as Employee;
        employee.id = docSnap.id;
        return employee;
    }
    return null;
}

async function createEmployee(employee: Employee) {
    delete employee.id;
    const docRef = await addDoc(collection(db, "employees"), employee);
    return docRef.id;
}

async function modifyEmployee(employee: Employee) {
    if (!employee.id) {
        throw new Error("Employee ID is required");
    }
    const docRef = doc(db, "employees", employee.id);
    delete employee.id;
    await setDoc(docRef, employee);
    return docRef.id;
}

async function deleteEmployee(id: string) {
    const docRef = doc(db, "employees", id);
    await deleteDoc(docRef);
}

async function getDocumentUrl(employeeId: string, document: string) {
    const storageRef = ref(storage, `employees/${employeeId}/documents/${document}`);
    return getDownloadURL(storageRef);
}

async function uploadDocument(employeeId: string, file: File) {
    const filename = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `employees/${employeeId}/documents/${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot.metadata.name;
}

export { readEmployees, readEmployee, createEmployee, modifyEmployee, deleteEmployee, getDocumentUrl, uploadDocument, readPermissions };