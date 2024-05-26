"use client";
import { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
const Main = () => {
  const router = useRouter();
  useEffect(() => {
    const checkUser = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/signup");
        return;
      }
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/auth/check`,
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      );
      if (
        response.status !== 200 ||
        response.data.error ||
        !response.data.data
      ) {
        router.push("/signup");
      }
      if ((response.data.data = "user verified")) {
        router.push("/dashboard");
      }
    };
    checkUser();
  }, []);
  return (
    <div className="w-full h-full">
      <img src="logo.png" alt="logo" className="w-fit h-fit" />
    </div>
  );
};
export default Main;
