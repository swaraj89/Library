import {
    getAuth,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";

const auth = getAuth();

class LoginService {
    signIn(id: string, password: string) {
        const user = signInWithEmailAndPassword(auth, id, password);
        return user;
    }

    signOut(){
        signOut(auth);
    }
}

export default new LoginService();