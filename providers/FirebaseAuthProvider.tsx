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
import { useNavigate } from "react-router-dom";
import useToasts from "../hooks/useToast";

export const FirebaseAuthContext = createContext<FirebaseAuthContextProps>(
    null!
);

export default function FirebaseAuthProvider({
    children,
}: {
    children?: ReactNode;
}) {
    const navigate = useNavigate();
    const { successToast } = useToasts();
    const [user, setUser] = useState<User>();
    const [userChanged, setUserChanged] = useState<boolean>(false);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUser(() => user);
                navigate("/");
                if (user.displayName)
                    successToast(`Welcome ${user.displayName}`);
            }
        });
        return unsubscribe;
    }, [userChanged]);

    const login = (props: FirebaseAuthParams) => {
        if (props.authType === AuthTypes.MANUAL) {
            signInWithEmailAndPassword(auth, props.email, props.password).then(
                (userCredential: UserCredential) => {
                    if (userCredential.user) {
                        navigate("/");
                    }
                }
            );
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            signInWithRedirect(auth, props.provider).then(() => {
                setUserChanged((prevState) => !prevState);
            });
            getRedirectResult(auth, (result: UserCredential) => {
                if (result.user) {
                    console.log(result.user);
                    setUser(result.user);
                    successToast("Account successfully created", "Thank you");
                    navigate("/login");
                }
            });
        }
    };

    const signup = (props: FirebaseAuthParams) => {
        console.log(props.authType);
        if (props.authType === AuthTypes.MANUAL) {
            createUserWithEmailAndPassword(
                auth,
                props.email,
                props.password
            ).then((userCredential: UserCredential) => {
                if (userCredential.user) {
                    setUserChanged((prevState) => !prevState);
                    successToast("Successfully logged in!", "Welcome");
                    navigate("/");
                    updateProfile(userCredential.user, {
                        displayName: props.name,
                    });
                }
            });
            // login(props);
        } else if (
            props.authType === AuthTypes.GOOGLE ||
            props.authType === AuthTypes.GITHUB
        ) {
            console.log("logging");
            signInWithRedirect(auth, props.provider).then(() => {
                setUserChanged((prevState) => !prevState);
            });
            getRedirectResult(auth, (result: UserCredential) => {
                if (result.user) {
                    setUser(user);
                    successToast("Successfully logged in!", "Welcome");
                }
                navigate("/");
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
