import { useDisclosure } from "@mantine/hooks";
import {
    Modal,
    Group,
    Button,
    createStyles,
    TextInput,
    Stack,
    Checkbox,
} from "@mantine/core";
import type { ReactNode } from "react";
import { useForm } from "@mantine/form";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { registerUser } from "../firebase/firestore";

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
    const { user } = useFirebaseAuth();
    const [opened, { open, close }] = useDisclosure(false);

    const form = useForm({
        initialValues: {
            regName: user?.displayName || "",
            regEmail: user?.email || "",
            regNo: "",
            terms: true,
        },

        validate: {
            regEmail: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            regNo: (value: string) =>
                /^\d{10,15}$/.test(value) ? "Invalid Registation Number" : null,
            terms: (value: boolean) =>
                !value ? "Must agree to terms and conditions" : null,
        },
    });

    const handleRegistration = (values: {
        regName: string;
        regEmail: string;
        regNo: string;
        terms: boolean;
    }) => {
        if (user)
            registerUser(
                user,
                Number(values.regNo),
                values.regEmail,
                values.regName
            );
    };

    return (
        <>
            <Modal opened={opened} onClose={close} title="Register" centered>
                <form
                    onSubmit={form.onSubmit((values) => {
                        handleRegistration(values);
                    })}
                >
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
                            value={form.values.regName}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "regName",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Confirm Email"
                            placeholder="Your Email"
                            value={form.values.regEmail}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "regEmail",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <TextInput
                            required
                            label="Registration Number"
                            placeholder="Your Registration Number"
                            value={form.values.regNo}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "regNo",
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
                    type="submit"
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
