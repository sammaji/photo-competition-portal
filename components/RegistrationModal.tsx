import { useDisclosure, useTimeout } from "@mantine/hooks";
import {
    Modal,
    Group,
    Button,
    createStyles,
    TextInput,
    Stack,
    Checkbox,
    Autocomplete,
    Select,
    SelectProps,
} from "@mantine/core";
import { useState, type ReactNode, useRef } from "react";
import { useForm } from "@mantine/form";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { registerUser } from "../firebase/firestore";
import { useNavigate } from "react-router-dom";
import useToasts from "../hooks/useToast";

const useStyles = createStyles((theme) => ({
    control: {
        [theme.fn.smallerThan("xs")]: {
            flex: 1,
        },
    },

    branchGroup: {
        display: "flex",
        gap: "1rem",
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

    const navigate = useNavigate();
    const { successToast, failureToast } = useToasts();

    const form = useForm({
        initialValues: {
            regName: user?.displayName || "",
            regEmail: user?.email || "",
            regNo: "",
            terms: true,
            branch: "M. Tech.",
            year: "",
            rollNo: "",
        },

        validate: {
            regEmail: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            regNo: (value: string) =>
                /^\d{8,15}$/.test(value) ? null : "Invalid Registation Number",
            rollNo: (value: string) =>
                /^\d{8,15}$/.test(value) ? null : "Invalid Registation Number",
            terms: (value: boolean) =>
                !value ? "Must agree to terms and conditions" : null,
        },
    });

    const handleRegistration = (values: {
        regName: string;
        regEmail: string;
        regNo: string;
        terms: boolean;
        branch: string;
        year: string;
        rollNo: string
    }) => {
        if (user)
            registerUser(
                user,
                Number(values.regNo),
                values.regEmail,
                values.regName,
                values.branch,
                values.year,
                Number(values.rollNo)
            )
                .then(() => {
                    successToast("Successfully registered 🤝");
                    navigate("/submit");
                })
                .catch((error) => {
                    console.log(error);
                    failureToast("Some unknown error occurred");
                });
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

                        <TextInput
                            required
                            label="Roll Number"
                            placeholder="Your Roll Number"
                            value={form.values.rollNo}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "rollNo",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />

                        <div className={classes.branchGroup}>
                            <Select
                                required
                                label="Branch"
                                placeholder="e.g. B. Tech"
                                data={[
                                    { value: "B.Tech.", label: "B.Tech." },
                                    { value: "M. Tech.", label: "M. Tech." },
                                ]}
                                {...form.getInputProps("branch")}
                            />
                            <Select
                                required
                                label="Year"
                                placeholder="e.g. Second"
                                data={[
                                    {
                                        value: "First",
                                        label: "First",
                                    },
                                    {
                                        value: "Second",
                                        label: "Second",
                                    },
                                    {
                                        value: "Third",
                                        label: "Third",
                                    },
                                    {
                                        value: "Fourth",
                                        label: "Fourth",
                                    },
                                ]}
                                {...form.getInputProps("year")}
                            />
                        </div>

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
                        Submit
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
