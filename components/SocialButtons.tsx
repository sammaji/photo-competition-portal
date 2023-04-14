import { Button, ButtonProps } from "@mantine/core";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { MouseEventHandler } from "react";

export function GoogleButton(
    props: ButtonProps & { onClick?: MouseEventHandler }
) {
    const { onClick, ...defProps } = props;
    return (
        <Button
            leftIcon={<FcGoogle />}
            variant="default"
            color="gray"
            onClick={props.onClick ?? props.onClick}
            {...defProps}
        />
    );
}

export function GithubButton(
    props: ButtonProps & { onClick?: MouseEventHandler }
) {
    return (
        <Button
            {...props}
            onClick={props.onClick ?? props.onClick}
            leftIcon={<FaGithub size="1rem" />}
            sx={(theme) => ({
                backgroundColor:
                    theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
                color: "#fff",
                "&:hover": {
                    backgroundColor:
                        theme.colors.dark[theme.colorScheme === "dark" ? 9 : 6],
                },
            })}
        />
    );
}
