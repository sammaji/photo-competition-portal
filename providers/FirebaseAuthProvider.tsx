import { ReactNode, createContext, useEffect, useState } from "react";
import {
    AuthTypes,
    FirebaseAuthContextProps,
    FirebaseAuthParams,
} from "../types";
import {
    User,
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut,
} from "firebase/auth";
import { auth } from "../firebase/init";
import { useNavigate } from "react-router-dom";

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>(
    null!
);

export default function FirebaseAuthProvider({
    children,
}: {
    children?: ReactNode;
}) {
    const navigate = useNavigate();
    const [user, setUser] = useState<User>();

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(user);
        });
        return unsubscribe;
    }, []);

    const login = (props: FirebaseAuthParams) => {
        if (props.authType === AuthTypes.MANUAL) {
            createUserWithEmailAndPassword(auth, props.email, props.password);
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            signInWithRedirect(auth, props.provider);
        }
    };

    const signup = (props: FirebaseAuthParams) => {
        if (props.authType === AuthTypes.MANUAL) {
            signInWithEmailAndPassword(auth, props.email, props.password);
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            signInWithRedirect(auth, props.provider);
        }
    };
    const signout = () => {
        signOut(auth);
        setUser(undefined);
    };

    const authProps = { user, login, signup, signout };
    return (
        <FirebaseAuthContext.Provider value={authProps}>
            {children}
        </FirebaseAuthContext.Provider>
    );
}
