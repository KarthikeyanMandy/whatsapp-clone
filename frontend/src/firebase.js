import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyC6PJQGYAeKEjYyIRLWjw3AxlZVbnK7FlM",
    authDomain: "whatsapp-clone-6f52d.firebaseapp.com",
    projectId: "whatsapp-clone-6f52d",
    storageBucket: "whatsapp-clone-6f52d.appspot.com",
    messagingSenderId: "352571466581",
    appId: "1:352571466581:web:8b0bedf23156a2aa7405dc"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();

export { app, auth, provider };