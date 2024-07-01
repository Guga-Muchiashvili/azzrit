"use client";
import React, {
  SetStateAction,
  useEffect,
  useState,
  useTransition,
} from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { ISignIn } from "@/app/signIn/SignIntype";
import ISignUp from "@/app/signUp/SignUptype";
import { useParams, useRouter } from "next/navigation";
import { SignUpUser } from "@/actions/SignUpUser/signUpUserAction";
import { signIn } from "@/auth";
import { login } from "@/actions/SignInUser/SignIn";
import { DEFAULT_ROUTE_NAVIGATE } from "@/routes";
import { motion } from "framer-motion";
import LoaderElement from "@/app/elements/loading/loader";
import TextInputElement from "@/app/elements/textInput/textInput.Element";
import ButtonInputElement from "@/app/elements/button/buttonInput.Element";
import { IFormComponentProps } from "./formComponentTypes";
import GoogleElementButton from "@/app/elements/google/googleElementButton";

const FormComponent = ({ schema }: IFormComponentProps) => {
  const [url, setUrl] = useState<string | undefined>("");
  const navigate = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ISignIn | ISignUp>({
    resolver: yupResolver(schema),
  });

  React.useEffect(() => {
    setUrl(window.location.href.split("/").filter(Boolean).pop());
  }, []);

  const onSubmit = async (data: ISignIn | ISignUp) => {
    if (url !== "signUp") {
      try {
        const loginAsync = async () => {
          const res = await login(data);
          if (res?.error) {
            toast.error(res?.error);
          } else {
            console.log(res);
            if (res?.succes) {
              toast.success("Email Sent");
              return setTimeout(() => {
                navigate.push("signIn");
              }, 1000);
            } else {
              toast.success("Logged in");
              setTimeout(() => {
                navigate.push(DEFAULT_ROUTE_NAVIGATE || "/");
              }, 1000);
            }

            reset();
          }
        };
        loginAsync();
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
    } else {
      try {
        const signUpAsync = async () => {
          const response = await SignUpUser(data as ISignUp);
          if (response.error) {
            toast.error(response.error);
          } else {
            toast.success(response.message);
            setTimeout(() => {
              navigate.push("/signIn");
            }, 1000);
            reset();
          }
        };
        signUpAsync();
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  if (url !== "signIn" && url !== "signUp") return <LoaderElement />;

  return (
    <form
      className="w-full md:w-2/3 lg:w-full h-2/3 bg-white rounded-md px-7 flex flex-col items-center justify-start py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.5 }}
        className="font-semibold text-oswalid text-3xl text-black"
      >
        {url === "signIn" ? "Sign In" : "Sign Up"}
      </motion.h1>
      {url === "signUp" ? (
        <>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.1, ease: "easeIn" }}
          >
            <TextInputElement
              id="name"
              placeholder="Enter name"
              type="text"
              label="Name"
              control={control}
              error={errors}
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
          >
            <TextInputElement
              id="email"
              placeholder="Enter email"
              type="email"
              label="Email"
              control={control}
              error={errors}
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.5, ease: "easeIn" }}
          >
            <TextInputElement
              id="password"
              placeholder="Enter password"
              type="password"
              label="Password"
              error={errors}
              control={control}
            />
          </motion.div>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.7, ease: "easeIn" }}
          >
            <TextInputElement
              id="confirmPassword"
              placeholder="Confirm password"
              type="password"
              label="Confirm password"
              control={control}
              error={errors}
            />
          </motion.div>
        </>
      ) : url === "signIn" ? (
        <>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
          >
            <TextInputElement
              id="email"
              placeholder="Enter email"
              type="email"
              label="Email"
              control={control}
              error={errors}
            />
          </motion.div>

          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeIn" }}
          >
            <TextInputElement
              id="password"
              placeholder="Enter password"
              type="password"
              label="Password"
              control={control}
              error={errors}
            />
          </motion.div>
        </>
      ) : (
        <LoaderElement />
      )}

      <div className="mt-2 flex flex-col justify-center items-center">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, ease: "easeIn" }}
          className="mt-5"
        >
          <ButtonInputElement text={url === "signUp" ? "Sign up" : "Sign in"} />
        </motion.div>
        <GoogleElementButton />
        <div className="mt-8 text-gray-500">
          {url === "signUp" ? (
            <Link href="/signIn">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1, ease: "easeIn" }}
                className="flex gap-2 text-sm cursor-pointer"
              >
                Already have an account?{" "}
                <span className="underline">Sign In</span>
              </motion.span>
            </Link>
          ) : (
            <Link href="/signUp">
              <motion.span
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.2, ease: "easeIn" }}
                className="flex gap-2 text-sm cursor-pointer"
              >
                Do not have an account?{" "}
                <span className="underline">Sign Up</span>
              </motion.span>
            </Link>
          )}
        </div>
      </div>
      <Toaster richColors />
    </form>
  );
};

export default FormComponent;
