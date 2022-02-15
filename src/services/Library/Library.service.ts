import {
    doc,
    collection,
    getDoc,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

import {db} from '../../firebase.config';
import { BookInterface } from '../../interface/Book.interface';

const LIBRARY_COLLECTION_NAME:string = process.env.REACT_APP_LIBRARY_COLLECTION_NAME || 'books';
const LibraryCollectionRef = collection(db, LIBRARY_COLLECTION_NAME);

class LibraryService {
    addBook = (newBook: BookInterface) => {
        return addDoc(LibraryCollectionRef,newBook);
    }

    updateBook = (id:string, updatedBook: BookInterface | any) => {
        const bookDoc = doc(db, LIBRARY_COLLECTION_NAME, id);

        return updateDoc(bookDoc, updatedBook);
    }

    deleteBook = (id: string) => {
        const bookDoc = doc(db, LIBRARY_COLLECTION_NAME, id);
        return deleteDoc(bookDoc);
    }
    
    getAllBooks = () => {
        return getDocs(LibraryCollectionRef);
    }
    
    getBook = (id: string) => {
        const bookDoc = doc(db, LIBRARY_COLLECTION_NAME, id);
        return getDoc(bookDoc);
    }
}

export default new LibraryService();