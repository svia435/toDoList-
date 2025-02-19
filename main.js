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

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRlnLBhUHGOF7Lfg9iy_SbfK6coM_7f1U",
  authDomain: "insan-cemerlang-6640c.firebaseapp.com",
  projectId: "insan-cemerlang-6640c",
  storageBucket: "insan-cemerlang-6640c.appspot.com",
  messagingSenderId: "917464283158",
  appId: "1:917464283158:web:3a6179cd71818d68f6dd37"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
//fungsi untuk menampilkan data dari data base
export async function ambilDaftartoDoList () {
  const refDokumen = collection(db, "toDoList");
  const kueri = query(refDokumen, orderBy("nama"));
  const cuplikanKueri = await getDocs(kueri);

  let hasil = [];
  cuplikanKueri.forEach((dok) => {
    hasil.push({
      id: dok.id,
      nama: dok.data().nama,
      status: dok.data().status,
      prioritas: dok.data(). prioritas,
      tanggal: dok.data().tanggal
    });
  });



  return hasil;
}
//################$#######

export function formatAngka(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}
//fungsi untuk menambahkan data
export async function tambahtoDoList (nama, status, prioritas, tanggal) {
  try {
    const dokRef = await addDoc(collection(db, 'toDoList'), {
      nama: nama,
      status: status,
      prioritas: prioritas,
      tanggal: tanggal
    });
    console.log('berhasil menembah toDoList ' + dokRef.id);
  } catch (e) {
    console.log('gagal menambah toDoList ' + e);
  }
}
//#####################
//fungsi untuk hapus data
export async function hapustoDoList (docId) {
  await deleteDoc(doc(db, "toDoList", docId));
}
//fungsi untuk ubah data
export async function ubahtoDoList (docId, nama, status, prioritas, tanggal,) {
  await updateDoc(doc(db, "toDoList", docId), {
    nama: nama,
    status: status,
    prioritas: prioritas,
    tanggal: tanggal
  });
}
//fungsi untuk ambil data dan untuk diubah
export async function ambiltoDoList (docId) {
  const docRef = await doc(db, "toDoList", docId);
  const docSnap = await getDoc(docRef);

  return await docSnap.data();
}