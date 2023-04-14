import { GithubAuthProvider, GoogleAuthProvider, User } from "firebase/auth";

export type FirebaseAuthContextProps = {
  user?: User;
  login: Function;
  signup: Function;
  signout: Function;
};

export enum AuthTypes {
  MANUAL,
  GOOGLE,
  GITHUB,
}

export type FirebaseAuthParams = {
  name?: string;
  regNo?: string;
  rollNo?: string;
  branch?: string;
  dept?: string;
} & (
  | { authType: AuthTypes.MANUAL; email: string; password: string }
  | { authType: AuthTypes.GOOGLE; provider: GoogleAuthProvider }
  | { authType: AuthTypes.GITHUB; provider: GithubAuthProvider }
);
