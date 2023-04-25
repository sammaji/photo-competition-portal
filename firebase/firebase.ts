import type { User } from "firebase/auth";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { firestore } from "./init";

export const createUser = async (user: User) => {
    console.log("create user into firebase...");
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

    // update dateCreated if user does not exist
    try {
        await setDoc(docRef, { dateCreated: Timestamp.now() });
    } catch {}
};

/* use this if you know a user already exists */
const updateUser = async (user: User) => {
    console.log("updating user into firebase...");

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

const readUser = () => {};

const deleteUser = () => {};

const registerUser = (
    user: User,
    regNo: number,
    regEmail: string,
    regName: string
) => {
    console.log("registering user ...");

    const docRef = doc(firestore, "user", user.uid);

    setDoc(docRef, { regEmail, regName, regNo }, { merge: true });
};
