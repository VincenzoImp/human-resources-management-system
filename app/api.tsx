import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase/config';

async function getEmployees() {
    const querySnapshot = await getDocs(collection(db, "employees"));
    const employees = new Map();
    querySnapshot.forEach(doc => {
        var data = doc.data();
        employees.set(doc.id, {
            ...data,
            birthdate: data.birthdate.toDate()
        });
        employees.set(doc.id, doc.data());
    });
    return employees;
}

// async function pushEmployee(employee: Employees) {
//     try {
//         const docRef = await addDoc(collection(db, "employees"), employee);
//         console.log("Document written with ID: ", docRef.id);
//     } catch (e) {
//         console.error("Error adding document: ", e);
//     }
// }

export { getEmployees };