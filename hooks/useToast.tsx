import { BsCheck } from "react-icons/bs";
import { notifications } from "@mantine/notifications";
import { RxCross2 } from "react-icons/rx";

const useToasts = () => {
    const successToast = (message: string, title: string = "") => {
        notifications.show({
            title,
            message,
            color: "green",
            icon: <BsCheck />,
        });
    };

    const failureToast = (message: string, title: string = "") => {
        notifications.show({
            title,
            message,
            color: "red",
            icon: <RxCross2 />,
        });
    };

    const loadingToast = (message: string, title: string = "", id: string) => {
        notifications.show({
            id,
            title,
            message,
            autoClose: false,
            withCloseButton: false,
            loading: true,
        });
    };

    const updateLoadingToastAsSuccess = (
        message: string,
        title: string = "",
        id: string
    ) => {
        notifications.update({
            id,
            message,
            title,
            color: "green",
            icon: <BsCheck />,
            autoClose: 5000,
            withCloseButton: true,
            loading: false,
        });
    };

    const updateLoadingToastAsFailure = (
        message: string,
        title: string = "",
        id: string
    ) => {
        notifications.update({
            id,
            message,
            title,
            color: "red",
            icon: <RxCross2 />,
            autoClose: 5000,
            withCloseButton: true,
            loading: false,
        });
    };

    return {
        failureToast,
        successToast,
        loadingToast,
        updateLoadingToastAsSuccess,
        updateLoadingToastAsFailure,
    };
};

export default useToasts;
