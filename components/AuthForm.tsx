import { upperFirst } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import {
    TextInput,
    PasswordInput,
    Text,
    Paper,
    Group,
    Button,
    Divider,
    Checkbox,
    Anchor,
    Stack,
} from "@mantine/core";
import { GithubButton, GoogleButton } from "./SocialButtons";
import { useNavigate } from "react-router-dom";
import { AuthTypes, FirebaseAuthParams } from "../types";
import useFirebaseAuth from "../hooks/useFirebaseAuth";
import { githubAuthProvider, googleAuthProvider } from "../firebase/init";
import { useState } from "react";

export enum AuthFormTypes {
    LOGIN,
    SIGNUP,
}

export function AuthForm({ authFormType }: { authFormType: AuthFormTypes }) {
    const navigate = useNavigate();
    const form = useForm({
        initialValues: {
            email: "",
            name: "",
            password: "",
            terms: true,
        },

        validate: {
            email: (value: string) =>
                /^\S+@\S+$/.test(value) ? null : "Invalid email",
            password: (value: string) =>
                value.length <= 6
                    ? "Password should include at least 6 characters"
                    : null,
        },
    });

    const { signup, login } = useFirebaseAuth();
    const [loading, setLoading] = useState<boolean>(false);

    const handleAuth = (
        authFormType: AuthFormTypes,
        values: FirebaseAuthParams
    ) => {
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);

        if (authFormType === AuthFormTypes.LOGIN) {
            login(values);
        } else if (authFormType === AuthFormTypes.SIGNUP) {
            signup(values);
        }
    };

    return (
        <Paper radius="md" p="xl" w={"400px"} withBorder>
            <Text size="lg" weight={500}>Continue with</Text>

            <Group grow mb="md" mt="md">
                <GoogleButton
                    onClick={() =>
                        handleAuth(authFormType, {
                            authType: AuthTypes.GOOGLE,
                            provider: googleAuthProvider,
                        })
                    }
                >{`Google`}</GoogleButton>
                <GithubButton
                    onClick={() =>
                        handleAuth(authFormType, {
                            authType: AuthTypes.GITHUB,
                            provider: githubAuthProvider,
                        })
                    }
                >{`Github`}</GithubButton>
            </Group>

            <Divider
                label="Or continue with email"
                labelPosition="center"
                my="lg"
            />

            <form
                onSubmit={form.onSubmit((values) => {
                    handleAuth(authFormType, {
                        name: values.name,
                        authType: AuthTypes.MANUAL,
                        email: values.email,
                        password: values.password,
                    });
                })}
            >
                <Stack>
                    {authFormType === AuthFormTypes.SIGNUP && (
                        <TextInput
                            required
                            label="Name"
                            placeholder="Your name"
                            value={form.values.name}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "name",
                                    event.currentTarget.value
                                )
                            }
                            radius="md"
                        />
                    )}

                    <TextInput
                        required
                        label="Email"
                        placeholder="hello@mantine.dev"
                        value={form.values.email}
                        onChange={(event) =>
                            form.setFieldValue(
                                "email",
                                event.currentTarget.value
                            )
                        }
                        error={form.errors.email && "Invalid email"}
                        radius="md"
                    />

                    <PasswordInput
                        required
                        label="Password"
                        placeholder="Your password"
                        value={form.values.password}
                        onChange={(event) =>
                            form.setFieldValue(
                                "password",
                                event.currentTarget.value
                            )
                        }
                        error={
                            form.errors.password &&
                            "Password should include at least 6 characters"
                        }
                        radius="md"
                    />

                    {authFormType === AuthFormTypes.SIGNUP && (
                        <Checkbox
                            label="I accept terms and conditions"
                            checked={form.values.terms}
                            onChange={(event) =>
                                form.setFieldValue(
                                    "terms",
                                    event.currentTarget.checked
                                )
                            }
                        />
                    )}
                </Stack>

                <Group position="apart" mt="xl">
                    <Anchor
                        component="button"
                        type="button"
                        color="dimmed"
                        size="xs"
                        onClick={() => {
                            if (authFormType === AuthFormTypes.LOGIN)
                                navigate("/signup");
                            else if (authFormType === AuthFormTypes.SIGNUP)
                                navigate("/login");
                        }}
                    >
                        {authFormType === AuthFormTypes.SIGNUP
                            ? "Already have an account? Login"
                            : "Don't have an account? Register"}
                    </Anchor>
                    <Button type="submit" disabled={loading} radius="xl">
                        {authFormType === AuthFormTypes.LOGIN
                            ? "Login"
                            : "Create Account"}
                    </Button>
                </Group>
            </form>
        </Paper>
    );
}
