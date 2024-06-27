"use client";
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Toaster, toast } from "sonner";
import TextInputElement from "@/elements/textInput/textInput.Element";
import ButtonInputElement from "@/elements/button/buttonInput.Element";
import Link from "next/link";
import { ISignIn } from "@/app/signIn/SignIntype";
import ISignUp from "@/app/signUp/SignUptype";
import { useParams, useRouter } from "next/navigation";
import { SignUpUser } from "@/actions/SignUpUser/signUpUserAction";
import { signIn } from "@/auth";
import { login } from "@/actions/SignInUser/SignIn";
import { DEFAULT_ROUTE_NAVIGATE } from "@/routes";
import {motion} from 'framer-motion'
import LoaderElement from "@/elements/loading/loader";

const FormComponent = ({ schema }: { schema: any }) => {
  const [url, seturl] = useState<string | undefined>("");
  const navigate = useRouter();

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm<ISignIn | ISignUp>({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: any) => {
    if (url !== "signUp") {
      try {
        console.log('here simon')
        const res = await login(data);
        console.log(res);
        if (res?.error) {
          toast.error(res?.error);
        } else {
          return console.log('11111111111')
          toast.success("Logged In succesfuly");
          // navigate.push(DEFAULT_ROUTE_NAVIGATE);
          return reset();
        }
      } catch (error) {}
    } else {
      try {
        const response = await SignUpUser(data);
        if (response.error) {
          toast.error(response.error);
        } else {
          toast.success(response.message);
          navigate.push("/");
          reset();
        }
      } catch (error) {
        toast.error("An unexpected error occurred.");
      }
    }
  };

  useEffect(() => {
    seturl(window.location.href.split("/").filter(Boolean).pop());
  }, []);

  if(url !== 'signIn' && url !== 'signUp') return <LoaderElement />
 
  return (
    <form
      className="w-full h-2/3 bg-white rounded-md px-7 flex flex-col items-center justify-start py-14"
      onSubmit={handleSubmit(onSubmit)}
    >

      <motion.h1 initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1.5}} className=" font-semibold text-oswalid text-3xl text-black">
        {url == "signIn" ? "sign In" : "sign Up"}
      </motion.h1>
      {url === "signUp" ? (
        <>
          <motion.div
            className="w-full"
            initial={{ opacity: 0, translateX: -10 }}
            animate={{ opacity: 1, translateY: 0, translateX: 0 }}
            transition={{duration : 1, delay: 0.1, ease : "easeIn" }}
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
            transition={{duration : 1, delay: 0.3, ease : "easeIn" }}
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
            transition={{duration : 1, delay: 0.5, ease : "easeIn" }}
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
            transition={{duration : 1, delay: 0.7, ease : "easeIn" }}
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
            transition={{duration : 1, delay: 0.3, ease : "easeIn" }}
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
            transition={{duration : 1, delay: 0.3, ease : "easeIn" }}
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
        <motion.div initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1.2, ease : "easeIn"}}>
        <ButtonInputElement text={url === "signUp" ? "Sign up" : "Sign in"} />
        </motion.div>
        <div className="mt-8 text-gray-500">
          {url === "signUp" ? (
            <Link href="/signIn">
              <motion.span initial={{opacity : 0}} animate={{opacity :1}} transition={{duration : 1, ease : "easeIn"}} className="flex gap-2 text-sm cursor-pointer">
                Already have an account?{" "}
                <span className="underline">Sign In</span>
              </motion.span>
            </Link>
          ) : (
            <Link href="/signUp">
                <motion.span initial={{opacity : 0}} animate={{opacity :1}} transition={{duration : 1.2, ease :"easeIn"}} className="flex gap-2 text-sm cursor-pointer">
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