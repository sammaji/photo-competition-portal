import { ref, uploadBytesResumable } from "firebase/storage";
import { storageBucket } from "./init";
import { Timestamp } from "firebase/firestore";

const uploadImage = async () => {
    uploadBytesResumable(
        ref(
            storageBucket,
            `image/${Timestamp.now().toString().replace(" ", "")}`
        ),
        new Blob()
    );
};
