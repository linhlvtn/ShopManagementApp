import { initializeApp } from 'firebase/app';
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { firebaseConfig } from '../firebaseConfigSetting.js';

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

const createAdmin = async () => {
  try {
    const adminCredential = await createUserWithEmailAndPassword(
      auth,
      'admin@suhii.com',
      'admin123456'
    );
    const admin = adminCredential.user;
    await setDoc(doc(db, 'users', admin.uid), {
      phone: 'admin_phone',
      role: 'admin',
      status: 'approved',
      createdAt: new Date(),
      name: 'Admin',
    });
    console.log('Tài khoản Admin đã được tạo');
  } catch (error) {
    console.error('Lỗi khi tạo tài khoản Admin:', error);
  }
};

createAdmin();