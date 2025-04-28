import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";

import {

  getFirestore,
  collection,
  addDoc,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
  query,
  orderBy,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
const firebaseConfig = {
  apiKey: "AIzaSyD_N_5Tjv9zh_eJyfTXxUOICM2XX86--IM",
  authDomain: "datasiswa-aebb3.firebaseapp.com",
  projectId: "datasiswa-aebb3",
  storageBucket: "datasiswa-aebb3.appspot.com",
  messagingSenderId: "1049128187878",
  appId: "1:1049128187878:web:e1879710f4b5252a68c827",
};
// Inisialisasi Firebase

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function ambildaftartodolist() {
  const refDokumen = collection(db, "todolist");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      prioritas: dok.data().prioritas,
      status: dok.data().status,
      tanggal: dok.data().tanggal,
    });
  });

  return hasil;
}
export async function tambahtodolist(nama, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'todolist'), {
      nama: nama,
      prioritas: prioritas,
      tanggal: tanggal,
      status: 'Belum Dikerjakan'
    });
    console.log('Berhasil menambah todolist' + dokRef.id);
  } catch (e) {
    console.log('Gagal menambah todolist ' + e);
  }
}

export async function hapustodolist(docid) {
  await deleteDoc(doc(db, "todolist", docid));
}
export async function ubahtodolist(docId, nama, prioritas, tanggal, status) {
  await updateDoc(doc(db, "todolist", docId), {
    nama: nama,
    prioritas: prioritas,
    tanggal: tanggal,
    status: status
  });
}
export async function ambiltodolist(docId) {
  const docRef = doc(db, "todolist", docId);
  const docSnap = await getDoc(docRef);

  return docSnap.data();
}