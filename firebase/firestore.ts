import type { User } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { firestore } from "./init";
import useToasts from "../hooks/useToast";
import { useNavigate } from "react-router-dom";

export const createUser = async (user: User) => {
    const docRef = doc(firestore, "user", user.uid);
    setDoc(
        docRef,
        {
            email: user.email,
            name: user.displayName,
            isVerified: user.emailVerified,
        },
        { merge: true }
    )
};

/* use this if you know a user already exists */
const updateUser = async (user: User) => {
    const docRef = doc(firestore, "user", user.uid);
    setDoc(
        docRef,
        {
            email: user.uid,
            name: user.displayName,
            dateUpdated: Timestamp.now(),
        },
        { merge: true }
    );
};

export const readUser = () => { };

export const deleteUser = () => { };

export const registerUser = async (
    user: User,
    regNo: number,
    regEmail: string,
    regName: string,
    branch: string,
    year: string,
    rollNo: number
) => {
    const docRef = doc(firestore, "user", user.uid);

    return setDoc(docRef, { regEmail, regName, regNo, branch, year, rollNo }, { merge: true })
};
