import { BsCheck } from "react-icons/bs";
import { notifications } from "@mantine/notifications";

const useToasts = () => {
    const successToast = (message: string, title: string = "") => {
        notifications.show({
            title,
            message,
            color: "green",
            icon: <BsCheck />,
        });
    };

    return { successToast };
};

export default useToasts;
