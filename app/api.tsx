import { addDoc, collection, doc, getDoc, getDocs, setDoc } from "firebase/firestore";
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

async function pullEmployee(id: string) {
    const docRef = doc(db, "employees", id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        const employee = docSnap.data() as Employee;
        employee.id = docSnap.id;
        return employee;
    }
    return null;
}

async function pushEmployee(employee: Employee) {
    const id = employee.id;
    delete employee.id;
    if (!id) {
        const docRef = await addDoc(collection(db, "employees"), employee);
        employee.id = docRef.id;
    } else {
        await setDoc(doc(db, "employees", id), employee);
        employee.id = id;
    }
    return employee.id;
}

export { pullEmployees, pullEmployee, pushEmployee };