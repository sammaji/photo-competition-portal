import {
    createStyles,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
    Image,
} from "@mantine/core";
import { BsCheck } from "react-icons/bs";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { useNavigate } from "react-router-dom";
import RegistrationModalButton from "./RegistrationModal";

const useStyles = createStyles((theme) => ({
    inner: {
        marginTop: "1rem",
        marginBottom: "1rem",
        display: "flex",
        justifyContent: "space-between",
        // paddingTop: `calc(${theme.spacing.xl} * 4)`,
        // paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        // marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "100%",
            // marginRight: 0,
        },
    },

    title: {
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

export function Hero() {
    const { classes } = useStyles();
    const { user, signout } = useFirebaseAuth();
    const navigate = useNavigate();

    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            মন মোর মেঘের সঙ্গী
                        </Title>
                        <Text color="dimmed" mt="md">
                            An intra-departmental photography competition where
                            the topic is <b>“Nature’s Photography”</b> - post your best
                            image you have captured that covers the vast and
                            vibrant beauty of our land through the artificial
                            lenses at our reach.
                        </Text>

                        <List
                            mt={30}
                            spacing="sm"
                            size="sm"
                            icon={
                                <ThemeIcon size={20} radius="xl">
                                    <BsCheck size={rem(12)} />
                                </ThemeIcon>
                            }
                        >
                            <List.Item>
                                <b>Date of Submission:</b> April 27th to April
                                30th
                            </List.Item>
                            <List.Item>
                                <b>Exhibition & Awarding Event:</b> May 10th
                            </List.Item>
                            <List.Item>
                                Top 20 pictures will be showcased & the
                                contenders will be <b>certified</b> and most
                                importantly the best 3 contenders will receive{" "}
                                <b>amazing prizes</b>.
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            {user ? (
                                <>
                                    <RegistrationModalButton>
                                        Register
                                    </RegistrationModalButton>
                                    <Button
                                        disabled={
                                            !(
                                                import.meta.env
                                                    .VITE_ALLOW_REGISTRATION ===
                                                "true"
                                            )
                                        }
                                        variant="default"
                                        radius="xl"
                                        size="md"
                                        className={classes.control}
                                        onClick={() => navigate("/submit")}
                                    >
                                        Submit
                                    </Button>
                                    <Button
                                        variant="default"
                                        radius="xl"
                                        size="md"
                                        className={classes.control}
                                        onClick={() => signout()}
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Button
                                        radius="xl"
                                        size="md"
                                        className={classes.control}
                                        onClick={() => navigate("/login")}
                                    >
                                        Login
                                    </Button>
                                    <Button
                                        variant="default"
                                        radius="xl"
                                        size="md"
                                        className={classes.control}
                                        onClick={() => navigate("/signup")}
                                    >
                                        Create Account
                                    </Button>
                                </>
                            )}
                        </Group>
                    </div>
                </div>
            </Container>
        </div>
    );
}
