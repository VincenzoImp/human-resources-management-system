import { addDoc, collection, getDocs } from "firebase/firestore";
import { db } from "./firebase/config";
import { Employee } from "./context";

async function pullEmployees() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = new Array<Employee>();
    querySnapshot.forEach(doc => {
        const employee = doc.data() as Employee;
        employee.id = doc.id;
        employees.push(employee);
    });
    return employees;
}

async function pushEmployee(employee: Employee) {
    try {
        delete employee.id;
        const docRef = await addDoc(collection(db, "employees"), employee);
        console.log("Document written with ID: ", docRef.id);
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}

export { pullEmployees, pushEmployee };