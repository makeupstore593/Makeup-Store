import { initializeApp } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.16.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyAVcXufaSSGms3o-hpv0EPtfBQ0yhk4080",
  authDomain: "makeup-store-a77ce.firebaseapp.com",
  projectId: "makeup-store-a77ce",
  storageBucket: "makeup-store-a77ce.firebasestorage.app",
  messagingSenderId: "445651271729",
  appId: "1:445651271729:web:7d3739daf8197605099510"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);