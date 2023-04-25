import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Group,
    Button,
    createStyles,
    rem,
    TextInput,
    Stack,
    Checkbox,
} from "@mantine/core";
import type { ReactNode } from "react";
import { useForm } from "@mantine/form";
import useFirebaseAuth from "../hooks/useFirebaseAuth";

const useStyles = createStyles((theme) => ({
    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },
}));

export default function RegistrationModalButton({
    children,
}: {
    children: ReactNode;
}) {
    const { classes } = useStyles();
    const [opened, { open, close }] = useDisclosure(false);

    const { user } = useFirebaseAuth();

    const form = useForm({
        initialValues: {
            name: "",
            email: "",
            regNo: "",
            terms: true,
        },

        validate: {
            email: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            regNo: (value: string) =>
                value.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });

    return (
        <>
            <Modal opened={opened} onClose={close} title="Register" centered>
                <form>
                    <Stack
                        sx={{
                            marginBottom: "2rem",
                            marginLeft: "1rem",
                            marginRight: "1rem",
                        }}
                    >
                        <TextInput
                            required
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name || (user) ? `${user?.displayName}` : ""}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Confirm Email"
                            placeholder="Your Email"
                            value={form.values.name || (user) ? `${user?.email}` : ""}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Registration Number"
                            placeholder="Your Registration Number"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <Checkbox
                            label="I accept the terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "terms",
                                    event.currentTarget.checked
                                )
                            }
                        />
                    </Stack>
                    <Button type="submit" radius="xl">
                        Register
                    </Button>
                </form>
            </Modal>

            <Group position="center">
                <Button
                    onClick={open}
                    radius="xl"
                    size="md"
                    className={classes.control}
                    disabled={
                        !(import.meta.env.VITE_ALLOW_REGISTRATION === "true")
                    }
                >
                    {children}
                </Button>
            </Group>
        </>
    );
}
