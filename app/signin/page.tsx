"use client";
import { ChangeEvent, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";

import Heading from "../component/heading";
import SubHeading from "../component/subheading";
import Input from "../component/input";
import Button from "../component/button";
import Warning from "../component/warning";
const Signin = () => {
  const [Email, setemail] = useState<string>("");
  const [password, setpassword] = useState<string>("");
  const router = useRouter();
  const handleClick = async () => {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/user/auth/signin`,
      {
        email: Email,
        password: password,
      }
    );
    if (
      (response.data.error && !response.data.token) ||
      response.status !== 200
    ) {
      toast.error(response.data.error);
      setemail("");
      setpassword("");
    } else {
      localStorage.setItem("token", response.data.token);
      router.push("/dashboard");
    }
  };
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <img
          src="logo.png"
          alt="logo"
          className="h-24 w-24 mx-auto rounded-lg"
        />
        <div className="rounded-lg bg-white w-80 text-center p-2 px-4">
          <Heading label={"Sign In"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <Input
            label={"text"}
            placeholder={"John.Doe@gmail.com"}
            head={"Email"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setemail(e.target.value);
            }}
            value={Email}
          />
          <Input
            label={"text"}
            placeholder={"1234"}
            head={"Password"}
            onChange={(e: ChangeEvent<HTMLInputElement>) => {
              setpassword(e.target.value);
            }}
            value={password}
          />
          <Button label={"Signin"} onClick={handleClick} />
          <Warning
            label={"Dont't have an account?"}
            to={"/signup"}
            text={"Sign up"}
          />
        </div>
      </div>
    </div>
  );
};
export default Signin;
