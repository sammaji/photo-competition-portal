import { Route, Routes } from "react-router-dom";
import { Hero } from "../components/Hero";
import { AuthForm } from "../components/AuthForm";
import { Flex } from "@mantine/core";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

function App() {
    const { user, signout } = useFirebaseAuth();

    return (
        <div className="App">
            {/* <button onClick={() => console.log(user)}>user</button>
            <button onClick={() => signout()}>signout</button> */}
            <Flex align={"center"} justify={"center"} h={"100vh"} w={"100vw"}>
                <Routes>
                    <Route path="/" element={<Hero />} />
                    <Route path="/login" element={<AuthForm type="Login" />} />
                    <Route
                        path="/signup"
                        element={<AuthForm type="Register" />}
                    />
                    <Route path="/root/admin/:adminID" />
                    <Route path="/submissions" />
                </Routes>
            </Flex>
        </div>
    );
}

export default App;
