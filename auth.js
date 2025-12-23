import { auth } from './firebase-config.js';
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

export const loginUser = async () => {
    const provider = new GoogleAuthProvider();
    try {
        const result = await signInWithPopup(auth, provider);
        alert(`Welcome back, ${result.user.displayName}!`);
        return result.user;
    } catch (error) {
        console.error("Login failed", error);
    }
};

export const logoutUser = () => signOut(auth);

export const checkAuthStatus = (callback) => {
    onAuthStateChanged(auth, callback);
};
