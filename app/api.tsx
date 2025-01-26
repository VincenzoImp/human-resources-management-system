"use client";

import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytes, deleteObject, listAll } from "firebase/storage";
import { db, storage } from "@/app/firebase/config";
import { Employee } from "@/app/context";
import { v4 as uuidv4 } from "uuid";

async function readPermissions(uid: string) {
    const docRef = doc(db, "settings", "permissions");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const permissions = docSnap.data() as Record<string, string[]>;
        return {
            write: permissions.write.includes(uid)
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
    flushEmployeesDocuments(employees);
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

async function getDocumentUrl(fullPath: string) {
    const storageRef = ref(storage, fullPath);
    return getDownloadURL(storageRef);
}

async function uploadDocument(basePath: string, file: File) {
    const filename = `${uuidv4()}_${file.name}`;
    const storageRef = ref(storage, `${basePath}${filename}`);
    const snapshot = await uploadBytes(storageRef, file);
    return snapshot.metadata.name;
}

async function deleteDocument(fullPath: string) {
    const storageRef = ref(storage, fullPath);
    await deleteObject(storageRef);
}

async function flushEmployeesDocuments(employees: Employee[]) {
    const employeesDocuments = employees.map(employee => employee.documents).flat();
    const storageRef = ref(storage, "employees/documents");
    const storageList = await listAll(storageRef);
    const storageDocuments = storageList.items.map(item => item.name);
    const documentsToDelete = storageDocuments.filter(document => !employeesDocuments.includes(document));
    documentsToDelete.forEach(async document => {
        await deleteDocument(`employees/documents/${document}`);
    });
}

export { readEmployees, readEmployee, createEmployee, modifyEmployee, deleteEmployee, getDocumentUrl, uploadDocument, readPermissions };