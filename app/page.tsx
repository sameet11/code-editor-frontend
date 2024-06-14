"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

const Main = () => {
  const router = useRouter();

  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signup");
        return;
      }

      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/auth/check`,
          {
            headers: {
              authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.status !== 200 || response.data.error || !response.data.data) {
          router.push("/signup");
          return;
        }

        if (response.data.data === "user verified") {
          router.push("/dashboard");
        }
      } catch (error) {
        toast.error("An error occurred while checking user authentication.");
        router.push("/signup");
        return;
      }
    };

    checkUser();
  }, [router]);

  return (
    <div className="w-full h-full">
      <img src="logo.png" alt="logo" className="w-fit h-fit" />
    </div>
  );
};

export default Main;

