// ask chat gpt
const handleAuthException = (code: string) => {
    switch (code) {
        case "auth/invalid-email":
            return "Invalid email address.";
        case "auth/user-disabled":
            return "This user account has been disabled.";
        case "auth/user-not-found":
            return "User not found.";
        case "auth/wrong-password":
            return "Incorrect password.";
        case "auth/email-already-in-use":
            return "Email address already in use.";
        case "auth/weak-password":
            return "Password is too weak.";
        case "auth/network-request-failed":
            return "A network error has occurred. Please try again later.";
        default:
            return "An unknown error has occurred. Please try again later.";
    }
};

export default handleAuthException;
