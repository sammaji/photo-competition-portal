import { ReactNode, createContext, useEffect, useState } from "react";
import {
    AuthTypes,
    FirebaseAuthContextProps,
    FirebaseAuthParams,
} from "../types";
import {
    User,
    UserCredential,
    createUserWithEmailAndPassword,
    getRedirectResult,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithRedirect,
    signOut,
    updateProfile,
} from "firebase/auth";
import { auth } from "../firebase/init";
import { useLocation, useNavigate } from "react-router-dom";
import useToasts from "../hooks/useToast";
import { createUser } from "../firebase/firestore";
import handleAuthException from "../firebase/auth_error_handler";

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>(
    null!
);

export default function FirebaseAuthProvider({
    children,
}: {
    children?: ReactNode;
}) {
    const location = useLocation();
    const navigate = useNavigate();
    const { failureToast, successToast } = useToasts();
    const [user, setUser] = useState<User>();
    const [userChanged, setUserChanged] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) setUser(() => user);

            if (
                user &&
                (location.pathname === "/" ||
                    location.pathname === "/login" ||
                    location.pathname === "/signup")
            ) {
                navigate("/");
                if (user.displayName)
                    successToast(`Welcome ${user.displayName || "User"} 👋`);

                createUser(user);
            }
        });
        return unsubscribe;
    }, [userChanged]);

    const login = (props: FirebaseAuthParams) => {
        if (props.authType === AuthTypes.MANUAL) {
            signInWithEmailAndPassword(auth, props.email, props.password)
                .then((userCredential: UserCredential) => {
                    if (userCredential && userCredential.user) {
                        // successToast(
                        //     `Welcome ${
                        //         userCredential.user.displayName || "User"
                        //     }`
                        // );
                    }
                })
                .catch((error) => {
                    failureToast(handleAuthException(error.code));
                });
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            signInWithRedirect(auth, props.provider).then(() => {
                setUserChanged((prevState) => !prevState);
            });
            getRedirectResult(auth).then((result: UserCredential | null) => {
                if (result && result.user) {
                    setUser(result.user);
                }
            });
        }
    };

    const signup = (props: FirebaseAuthParams) => {
        if (props.authType === AuthTypes.MANUAL) {
            createUserWithEmailAndPassword(auth, props.email, props.password)
                .then((userCredential: UserCredential) => {
                    if (userCredential.user) {
                        setUserChanged((prevState) => !prevState);

                        // welcome toast message
                        // successToast(
                        //     `Welcome ${userCredential.user.displayName}`
                        // );

                        updateProfile(userCredential.user, {
                            displayName: props.name,
                        });
                    }
                })
                .catch((error) => {
                    failureToast(handleAuthException(error.code));
                });
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            signInWithRedirect(auth, props.provider).then(() => {
                setUserChanged((prevState) => !prevState);
            });
        }
    };

    const signout = () => {
        signOut(auth).then(() => successToast("Successfully signed out"));
        setUser(undefined);
    };

    const authProps = { user, login, signup, signout };
    return (
        <FirebaseAuthContext.Provider value={authProps}>
            {children}
        </FirebaseAuthContext.Provider>
    );
}
