import { useContext } from "react";
import { FirebaseAuthContext } from "../providers/FirebaseAuthProvider";

const useFirebaseAuth = () => useContext(FirebaseAuthContext);

export default useFirebaseAuth;
