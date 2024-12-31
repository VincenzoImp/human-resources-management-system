import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
import { db } from "@/app/firebase/config";
import { Employee } from "@/app/context";

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

export { readEmployees, readEmployee, createEmployee, modifyEmployee, deleteEmployee };