"use client";

export default function Employees() {
    return (
        <h1 className="text-4xl font-bold text-center m-8">Employees</h1>
    );
}

// import { addDoc, collection, getDocs } from "firebase/firestore";
// import { db } from "../firebase/config";

// interface Employee {
//     birthdate: Date;
//     birthplace: string;
//     birthplace_nation: string;
//     birthplace_provincia: string;
//     email: string;
//     gender: string;
//     livingplace_address: string;
//     livingplace_nation: string;
//     livingplace_provincia: string;
//     livingplace_zipcode: number;
//     n_mat: number;
//     n_pro: number;
//     name: string;
//     phone: string;
//     surname: string;
//     tax_code: string;
// }

// async function pushEmployee(employee: Employee) {
//     try {
//         const docRef = await addDoc(collection(db, "employees"), employee);
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }

// async function getEmployees() {
//     const querySnapshot = await getDocs(collection(db, "employees"));
//     return querySnapshot.docs.map((doc) => {
//         const data = doc.data();
//         return {
//             ...data,
//             birthdate: data.birthdate.toDate(),
//             birthplace: data.birthplace,
//             birthplace_nation: data.birthplace_nation,
//             birthplace_provincia: data.birthplace_provincia,
//             email: data.email,
//             gender: data.gender,
//             livingplace_address: data.livingplace_address,
//             livingplace_nation: data.livingplace_nation,
//             livingplace_provincia: data.livingplace_provincia,
//             livingplace_zipcode: data.livingplace_zipcode,
//             n_mat: data.n_mat,
//             n_pro: data.n_pro,
//             name: data.name,
//             phone: data.phone,
//             surname: data.surname,
//             tax_code: data.tax_code
//         };
//     });
// }