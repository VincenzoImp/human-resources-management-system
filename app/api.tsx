import { addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';
import { Employee } from './context';

async function getEmployees() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = new Array();
    querySnapshot.forEach(doc => {
        var data = doc.data();
        employees.push({ ...data, id: doc.id });
    });
    return employees;
}

async function pushEmployee(employee: Employee) {
    try {
        const docRef = await addDoc(collection(db, "employees"), employee);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export { getEmployees };