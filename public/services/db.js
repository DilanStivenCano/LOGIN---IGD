var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-app.js";
import { getFirestore, collection, query, where, getDocs, addDoc } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
//Al profesor le salen los mismos errores
const firebaseConfig = {
    apiKey: "AIzaSyBqS_k7qezN2VI0bCPGssJJyyau-jc7avI",
    authDomain: "baseiniciosesion-e744a.firebaseapp.com",
    projectId: "baseiniciosesion-e744a",
    storageBucket: "baseiniciosesion-e744a.appspot.com",
    messagingSenderId: "128857925376",
    appId: "1:128857925376:web:3ef4bd4a116b80a229b5e5",
    measurementId: "G-RGD9PR0N3F"
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const usersRef = collection(db, "usuarios");
export const queryUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const q = query(usersRef, where("email", "==", email), where("password", "==", password));
        const querySnapshot = yield getDocs(q);
        console.log(querySnapshot);
        querySnapshot.forEach((doc) => {
            console.log(doc.id, "=>", doc.data());
        });
        return !querySnapshot.empty;
    }
    catch (error) {
        return false;
    }
});
export const addUser = ({ email, password }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (email != "" && password != "") {
            const docRef = yield addDoc(collection(db, "usuarios"), {
                email,
                password
            });
            return true;
        }
    }
    catch (error) {
        return false;
    }
});
export const addPost = ({ username, image, comment }) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield addDoc(collection(db, "posts"), {
            user: username,
            viewers: 0,
            comments: 0,
            pictureprofile: "https://yt3.ggpht.com/GUW78kIdMM2mVjl-c1rkSD8DqNYSRZAfTUTie3j4xKFN6agTpdb9UiMDGwQB2yuoDpKB1a8QNn8=s900-c-k-c0x00ffffff-no-rj",
            ubi: "Cali, Valle",
            content: image,
            likes: "7777 Likes",
            description: comment,
            coments: "View all 10 coments",
            date: 'Just now',
            time: Date.now(),
        });
        return true;
    }
    catch (error) {
        return false;
    }
});
export const getPosts = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = [];
        const querySnapshot = yield getDocs(collection(db, 'posts'));
        querySnapshot.forEach((post) => {
            posts.push(post.data());
            console.log(post.data());
        });
        return posts;
    }
    catch (error) {
        console.error(error);
        alert('Ocurrió un error');
    }
});
