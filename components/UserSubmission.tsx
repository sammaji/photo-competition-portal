import {
    Alert,
    Button,
    Image,
    Stack,
    Text,
    Title,
    createStyles,
    rem,
} from "@mantine/core";
import { getDownloadURL, list, listAll, ref } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { auth, storageBucket } from "../firebase/init";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { UserCredential, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import useToasts from "../hooks/useToast";

const useStyles = createStyles((theme) => ({
    buttonContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        gap: "1rem",
    },
    main: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "1rem",
        maxWidth: "480px",
    },
    title: {
        width: "100%",
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
        fontFamily: `Greycliff CF, ${theme.fontFamily}`,
        fontSize: rem(44),
        lineHeight: 1.2,
        fontWeight: 900,

        [theme.fn.smallerThan("xs")]: {
            fontSize: rem(28),
        },
    },
    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },
}));

export default function UserSubmission() {
    const { classes } = useStyles();
    const { user } = useFirebaseAuth();

    const [loading, setLoading] = useState<boolean>(true);
    const [img, setImg] = useState<string | null>(null);

    const navigate = useNavigate();
    const { failureToast } = useToasts();

    useEffect(() => {
        // if (!user) {
        //     navigate("/signup");
        //     failureToast("You need to be signed in to view your submissions");
        // }

        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                listAll(ref(storageBucket, `${user?.uid || "anonymous"}`)).then(
                    (result) => {
                        result.items.forEach((item) => {
                            getDownloadURL(item).then((img_url) => {
                                if (loading) {
                                    setLoading(false);
                                    setImg(img_url);
                                }
                            });
                        });
                    }
                );
            }
        });
        return unsubscribe;
    }, []);

    return (
        <div className={classes.main}>
            <Title className={classes.title}>Your Submission</Title>
            <Alert>
                *This page shows your submission details. Note that you can
                submit only one image. Any new submission will delete this one.
            </Alert>

            <Stack>
                <Image src={img} height={200} width={"auto"} />
            </Stack>
            {/* 
            <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
            >
                Refresh
            </Button> */}
        </div>
    );
}
