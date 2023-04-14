import {
    createStyles,
    Image,
    Container,
    Title,
    Button,
    Group,
    Text,
    List,
    ThemeIcon,
    rem,
} from "@mantine/core";
import { BsCheck } from "react-icons/bs";
import image from "./image.svg";

const useStyles = createStyles((theme) => ({
    inner: {
        display: "flex",
        justifyContent: "space-between",
        // paddingTop: `calc(${theme.spacing.xl} * 4)`,
        // paddingBottom: `calc(${theme.spacing.xl} * 4)`,
    },

    content: {
        maxWidth: rem(480),
        marginRight: `calc(${theme.spacing.xl} * 3)`,

        [theme.fn.smallerThan("xs")]: {
            maxWidth: "100%",
            marginRight: 0,
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
            fontWeight: 900,
        },
    },

    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },

    // image: {
    //     flex: 1,

    //     [theme.fn.smallerThan("sm")]: {
    //         display: "none",
    //     },
    // },

    // highlight: {
    //   position: 'relative',
    //   backgroundColor: theme.fn.variant({ variant: 'light', color: theme.primaryColor }).background,
    //   borderRadius: theme.radius.sm,
    //   padding: `${rem(4)} ${rem(12)}`,
    // },
}));

export function Hero() {
    const { classes } = useStyles();
    return (
        <div>
            <Container>
                <div className={classes.inner}>
                    <div className={classes.content}>
                        <Title className={classes.title}>
                            Photography Competition
                        </Title>
                        <Text color="dimmed" mt="md">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Vero debitis nobis error nostrum repudiandae
                            quaerat veritatis consequatur cumque omnis sequi
                            nemo, dolorum vitae adipisci magni neque voluptatum
                            voluptate laudantium. Soluta?
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
                                <b>Highlight 1</b> – Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Vero debitis nobis
                                error nostrum repudiandae quaerat
                            </List.Item>
                            <List.Item>
                                <b>Highlight 2</b> – Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Vero debitis nobis
                                error nostrum repudiandae quaerat
                            </List.Item>
                            <List.Item>
                                <b>Highlight 3</b> – Lorem ipsum dolor sit amet
                                consectetur adipisicing elit. Vero debitis nobis
                                error nostrum repudiandae quaerat
                            </List.Item>
                        </List>

                        <Group mt={30}>
                            <Button
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                Register
                            </Button>
                            <Button
                                variant="default"
                                radius="xl"
                                size="md"
                                className={classes.control}
                            >
                                View Github
                            </Button>
                        </Group>
                    </div>
                    {/* <Image src={src} className={classes.image} /> */}
                </div>
            </Container>
        </div>
    );
}
