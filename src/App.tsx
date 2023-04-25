import { Route, Routes } from "react-router-dom";
import { Hero } from "../components/Hero";
import { AuthForm, AuthFormTypes } from "../components/AuthForm";
import { Flex, createStyles } from "@mantine/core";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import useToasts from "../hooks/useToast";
import { AuthTypes } from "../types";
import Submission from "../components/Submission";
import UserSubmission from "../components/UserSubmission";

const useStyles = createStyles((theme) => ({
    flexCon: {
        height: "100vh",
    },
}));

function App() {
    const { classes } = useStyles();
    const { successToast } = useToasts();
    const { user, signout } = useFirebaseAuth();

    return (
        <div className="App">
            {/* <button onClick={() => console.log(user)}>user</button>
            <button onClick={() => signout()}>signout</button> */}
            <Flex
                className={classes.flexCon}
                align={"center"}
                justify={"center"}
                direction={"column"}
                w={"100vw"}
            >
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route
                        path="/login"
                        element={
                            <AuthForm authFormType={AuthFormTypes.LOGIN} />
                        }
                    />
                    <Route
                        path="/signup"
                        element={
                            <AuthForm authFormType={AuthFormTypes.SIGNUP} />
                        }
                    />
                    <Route path="/root/admin/:adminID" />
                    <Route path="/submit" element={<Submission />} />
                    <Route path="/submission" element={<UserSubmission />} />
                </Routes>
            </Flex>
        </div>
    );
}

export default App;
