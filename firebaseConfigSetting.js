// Import các thư viện cần thiết
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export const firebaseConfig = {
  apiKey: "AIzaSyDGfe3AO839u9-2Esm4xBu9_vR_guS5qHo",
  authDomain: "suhii-ef849.firebaseapp.com",
  projectId: "suhii-ef849",
  storageBucket: "suhii-ef849.firebasestorage.app",
  messagingSenderId: "444753173579",
  appId: "1:444753173579:web:2db658f708e93bafe181ce"
};

// Chỉ khởi tạo 1 lần
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Export auth hoặc các service cần dùng
const auth = getAuth(app);
export { auth };