import { useRouter } from "next/navigation";

export const AuthCheck = () => {
    const router = useRouter();

    const token = localStorage.getItem("token");
    if (!token) {
        router.push("/signin");
    }

    return;
};
