import {
    getAuth,
    signInWithEmailAndPassword
} from "firebase/auth";

const auth = getAuth();

class LoginService {
    signIn(id: string, password: string) {
        const user = signInWithEmailAndPassword(auth, id, password);
        return user;
    }
}

export default new LoginService();