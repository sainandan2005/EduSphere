// firebase.ts
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyBsfqX0PRKnolrafkw9N-4Yg494utdMS9g",
  authDomain: "igebra-hackathon-project.firebaseapp.com",
  projectId: "igebra-hackathon-project",
  storageBucket: "igebra-hackathon-project.firebasestorage.app",
  messagingSenderId: "163012948729",
  appId: "1:163012948729:web:ea5224200948dcf4412828",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();