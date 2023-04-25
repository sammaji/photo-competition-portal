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

    return { failureToast, successToast };
};

export default useToasts;
