import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseAuthProvider from "../providers/FirebaseAuthProvider";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
    <BrowserRouter>
        <MantineProvider
            theme={{ colorScheme: "light" }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Notifications />

            <FirebaseAuthProvider>
                <App />
            </FirebaseAuthProvider>
        </MantineProvider>
    </BrowserRouter>
);
