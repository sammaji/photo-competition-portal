import {
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
import { storageBucket } from "../firebase/init";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

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

    useEffect(() => {
        console.log(user?.uid);
        listAll(ref(storageBucket, `${user?.uid || "anonymous"}`)).then(
            (result) => {
                result.items.forEach((item) => {
                    getDownloadURL(item).then((img_url) => {
                        console.log(img_url);
                        if (loading) {
                            setLoading(false);
                            setImg(img_url);
                        }
                    });
                });

                // getDownloadURL(result.items[0]).then((img_url) => {
                //     console.log(img_url);
                //     setLoading(false);
                //     setImg(img_url);
                // });
            }
        );
    }, []);

    return (
        <div className={classes.main}>
            <Title className={classes.title}>Your Submission</Title>
            <Text>This page shows your submission details.</Text>

            <Stack>
                {loading && <Image src={img} height={200} width={200} />}
            </Stack>

            <Button
                variant="default"
                radius="xl"
                size="md"
                className={classes.control}
            >
                Submit
            </Button>
        </div>
    );
}
