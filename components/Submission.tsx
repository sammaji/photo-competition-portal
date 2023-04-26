import {
    Group,
    Text,
    useMantineTheme,
    rem,
    Title,
    createStyles,
    Button,
    Container,
} from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
    AiOutlineClose,
    AiOutlineCheck,
    AiOutlineFileImage,
} from "react-icons/ai";
import { uploadImage } from "../firebase/storage_bucket";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import useToasts from "../hooks/useToast";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

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
        padding: "16px",
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

export default function Submission(props: Partial<DropzoneProps>) {
    const theme = useMantineTheme();
    const { classes } = useStyles();
    const { user } = useFirebaseAuth();
    const { failureToast } = useToasts();

    const [title, setTitle] = useState<String>(
        "Drag images here or click to select files"
    );
    const [desc, setDesc] = useState<String>(
        "Attach as many files as you like, each file should not exceed 5mb"
    );

    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate("/signup");
            failureToast("You need to be signed in to make submissions");
        }
    }, []);

    return (
        <Container className={classes.main}>
            <Title className={classes.title}>Your Submission</Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                perspiciatis amet est quasi facilis placeat eligendi alias quam,
                aliquam eos ut ipsum corrupti modi optio cupiditate illum
                ducimus tempore dolor?
            </Text>
            <Dropzone
                onDrop={(files) => {
                    uploadImage(user?.uid || "anonymous", files[0]);
                    setTitle(files[0].name);
                }}
                onReject={() => {
                    setTitle("Invalid File");
                    failureToast("File upload failed");
                }}
                maxSize={5 * 1024 ** 2}
                accept={IMAGE_MIME_TYPE}
                {...props}
            >
                <Group
                    position="center"
                    spacing="xl"
                    style={{ minHeight: rem(220), pointerEvents: "none" }}
                >
                    <Dropzone.Accept>
                        <AiOutlineCheck
                            size="3.2rem"
                            color={
                                theme.colors[theme.primaryColor][
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <AiOutlineClose
                            size="3.2rem"
                            color={
                                theme.colors.red[
                                    theme.colorScheme === "dark" ? 4 : 6
                                ]
                            }
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <AiOutlineFileImage size="3.2rem" />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            {title}
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            {desc}
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <div className={classes.buttonContainer}>
                <Button
                    radius="xl"
                    size="md"
                    variant="default"
                    onClick={() => {
                        navigate("/submission");
                    }}
                >
                    View Submissions
                </Button>
                <Button radius="xl" size="md" className={classes.control}>
                    Submit
                </Button>
            </div>
        </Container>
    );
}
