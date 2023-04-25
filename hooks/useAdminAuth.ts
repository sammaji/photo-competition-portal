import { useContext } from "react";
import { FirebaseAuthContext } from "../providers/FirebaseAuthProvider";

const useAdminAuth = () => useContext(FirebaseAuthContext);