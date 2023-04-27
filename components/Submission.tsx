import {
    Group,
    Text,
    useMantineTheme,
    rem,
    Title,
    createStyles,
    Button,
    Container,
    Textarea,
} from "@mantine/core";
import {
    Dropzone,
    DropzoneProps,
    FileWithPath,
    IMAGE_MIME_TYPE,
} from "@mantine/dropzone";
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
import { useForm } from "@mantine/form";
import { updateDescription } from "../firebase/firestore";

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
        justifyContent: "center",
        gap: "2rem",
        maxWidth: "480px",
        padding: "18px",
        height: "fit-content",
        marginTop: "16rem",
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
        "Your image should not exceed 5mb"
    );
    const [hasDesc, setHasDesc] = useState<boolean>(true);

    const navigate = useNavigate();
    const [submissionFile, setSubmissionFile] = useState<FileWithPath | null>(
        null
    );

    const form = useForm({
        initialValues: {
            desc: "",
        },
    });

    const handleSubmit = (values: { desc: string }) => {
        if (user) updateDescription(user, values.desc);
    };

    return (
        <Container className={classes.main}>
            <Title className={classes.title}>Your Submission</Title>
            <Text>
                Submit the best nature image from your collection, you can
                change the submitted image before the deadline, but note that,
                you can submit <b>only one image</b> and the image must not use
                any <b>filters or editing</b>, must not be a pirated image from
                any website and it should be within the <b>limit of 5MB</b>. You
                must provide a description of the image in less than 50 words,
                If any of these conditions are violated, your response will not
                be granted, and you will get disqualified from the competition.
            </Text>
            <Dropzone
                onDrop={(files) => {
                    setSubmissionFile(files[0]);
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
            <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
                <Textarea
                    required={true}
                    w={"100%"}
                    label="Description"
                    placeholder="Describe your image"
                    onChange={(event) => {
                        form.setFieldValue("desc", event.currentTarget.value);
                        if (
                            event.currentTarget.value &&
                            event.currentTarget.value.trim() !== ""
                        )
                            setHasDesc(true);
                        else setHasDesc(false);
                    }}
                />

                <div
                    style={{ paddingTop: "2rem" }}
                    className={classes.buttonContainer}
                >
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
                    <Button
                        radius="xl"
                        size="md"
                        className={classes.control}
                        onClick={() => {
                            if (submissionFile && hasDesc) {
                                uploadImage(
                                    user?.uid || "anonymous",
                                    submissionFile
                                ).then(() => {
                                    navigate("/submission");
                                });
                            } else if (!hasDesc) {
                                failureToast("Please enter a description");
                            } else {
                                failureToast("Please select a file");
                            }
                        }}
                    >
                        Submit
                    </Button>
                </div>
            </form>
        </Container>
    );
}
