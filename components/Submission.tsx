import {
    Group,
    Text,
    useMantineTheme,
    rem,
    Title,
    createStyles,
    Button,
} from "@mantine/core";
import { Dropzone, DropzoneProps, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import {
    AiOutlineClose,
    AiOutlineCheck,
    AiOutlineFileImage,
} from "react-icons/ai";

const useStyles = createStyles((theme) => ({
    buttonContainer: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
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

export default function Submission(props: Partial<DropzoneProps>) {
    const theme = useMantineTheme();
    const { classes } = useStyles();

    return (
        <div className={classes.main}>
            <Title className={classes.title}>Your Submission</Title>
            <Text>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Illo
                perspiciatis amet est quasi facilis placeat eligendi alias quam,
                aliquam eos ut ipsum corrupti modi optio cupiditate illum
                ducimus tempore dolor?
            </Text>
            <Dropzone
                onDrop={(files) => console.log("accepted files", files)}
                onReject={(files) => console.log("rejected files", files)}
                maxSize={3 * 1024 ** 2}
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
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" color="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should
                            not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </Dropzone>
            <div className={classes.buttonContainer}>
                <Button radius="xl" size="md" className={classes.control}>
                    Submit
                </Button>
            </div>
        </div>
    );
}
