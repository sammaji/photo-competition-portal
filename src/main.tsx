import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseAuthProvider from "../providers/FirebaseAuthProvider";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <React.StrictMode>
        <MantineProvider
            theme={{ colorScheme: "light" }}
            withGlobalStyles
            withNormalizeCSS
        >
            <BrowserRouter>
                <FirebaseAuthProvider>
                    <App />
                </FirebaseAuthProvider>
            </BrowserRouter>
        </MantineProvider>
    </React.StrictMode>
);
