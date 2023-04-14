import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import FirebaseAuthProvider from "../providers/FirebaseAuthProvider";
import { MantineProvider } from "@mantine/core";
import { BrowserRouter } from "react-router-dom";
import { Notifications } from "@mantine/notifications";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
        <MantineProvider
            theme={{ colorScheme: "light" }}
            withGlobalStyles
            withNormalizeCSS
        >
            <Notifications />
            <BrowserRouter>
                <FirebaseAuthProvider>
                    <App />
                </FirebaseAuthProvider>
            </BrowserRouter>
        </MantineProvider>
);
