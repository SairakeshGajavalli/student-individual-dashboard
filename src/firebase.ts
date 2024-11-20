import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBPE6TbZykGf7Kui6fsR6-3W9w6uuzg0ms",
  authDomain: "login-12d02.firebaseapp.com",
  databaseURL: "https://login-12d02-default-rtdb.firebaseio.com",
  projectId: "login-12d02",
  storageBucket: "login-12d02.appspot.com",
  messagingSenderId: "894912184495",
  appId: "1:894912184495:web:2a6fadb14356c49b24545a",
  measurementId: "G-G9XVZSVL5Y",
};

const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);