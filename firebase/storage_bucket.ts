import { ref, uploadBytes } from "firebase/storage";
import { storageBucket } from "./init";
import { Timestamp } from "firebase/firestore";
import useToasts from "../hooks/useToast";

export const uploadImage = async (uid: string, file: File) => {
    const { loadingToast, updateLoadingToastAsSuccess } = useToasts();
    loadingToast("Uploading image...", "", "img-upload-toast-id")

    const timestamp = Timestamp.now()
    const imageRef = ref(storageBucket, `${uid}/s${timestamp.seconds}n${timestamp.nanoseconds}`)
    uploadBytes(imageRef, file).then(() => { updateLoadingToastAsSuccess("Image successfully submitted 🔥", "", "img-upload-toast-id") })
};
