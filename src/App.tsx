import { Route, Routes } from "react-router-dom";
import { Hero } from "../components/Hero";
import { AuthForm, AuthFormTypes } from "../components/AuthForm";
import { Flex } from "@mantine/core";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import useToasts from "../hooks/useToast";
import { AuthTypes } from "../types";

function App() {
    const { successToast } = useToasts();
    const { user, signout } = useFirebaseAuth();

    return (
        <div className="App">
            <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
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
                    <Route path="/submissions" />
                </Routes>
            </Flex>
        </div>
    );
}

export default App;
