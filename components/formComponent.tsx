'use client'
import React, { SetStateAction, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {Toaster, toast} from 'sonner'
import TextInputElement from "@/elements/textInput/textInput.Element";
import ButtonInputElement from "@/elements/button/buttonInput.Element";
import Link from "next/link";
import { ISignIn } from "@/app/signIn/SignIntype";
import ISignUp from "@/app/signUp/SignUptype";
import { useParams } from "next/navigation";
import { SignUpUser } from "@/actions/SignUpUser/signUpUserAction";


const FormComponent = ({ signUp, schema } : {signUp : boolean, schema : any}) => {
    const [url, seturl] = useState<string | undefined>("")

  const { handleSubmit, control, formState: { errors }, reset } = useForm<ISignIn | ISignUp>({
    resolver: yupResolver(schema),
  });

  
const onSubmit = async (data: any) => {
        try {
            const response = await SignUpUser(data);
            if (response.error) {
                toast.error(response.error);
            } else {
                toast.success(response.message);
                reset();
            }
        } catch (error) {
            toast.error("An unexpected error occurred.");
        }
    };

  useEffect(() => {
seturl(window.location.href.split('/').filter(Boolean).pop())
  }, [])

  console.log(url)
  return (
    <form
      className="w-3/4 md:w-1/2 lg:w-1/4 h-2/3 bg-white rounded-md px-7 flex flex-col items-center justify-start py-14"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h1 className="font-normal text-3xl text-black">
        {signUp ? "Sign up" : "Sign in"}
      </h1>
      {signUp ? (
        <>
          <TextInputElement
            id="username"
            placeholder="Enter username"
            type="text"
            label="Username"
            control={control}
            error={errors}
          />
          <TextInputElement
            id="email"
            placeholder="Enter email"
            type="email"
            label="Email"
            control={control}
            error={errors}
          />
          <TextInputElement
            id="password"
            placeholder="Enter password"
            type="password"
            label="Password"
            error={errors}
            control={control}
          />
          <TextInputElement
            id="confirmPassword"
            placeholder="Confirm password"
            type="password"
            label="Confirm password"
            control={control}
            error={errors}
          />
        </>
      ) : (
        <>
          <TextInputElement
            id="email"
            placeholder="Enter email"
            type="email"
            label="Email"
            control={control}
            error={errors}
          />
          <TextInputElement
            id="password"
            placeholder="Enter password"
            type="password"
            label="Password"
            control={control}
            error={errors}
          />
        </>
      )}

      <div className="mt-2 flex flex-col justify-center items-center">
        <ButtonInputElement text={signUp ? "Register" : "Log in"} />
        <div className="mt-8 text-gray-500">
          {url == 'signUp' ? (
            <Link href="/signIn">
              <span className="flex gap-2 text-sm cursor-pointer">
                Already have an account?{" "}
                <span className="underline">Sign In</span>
              </span>
            </Link>
          ) : (
            <Link href="/signUp">
              <span className="flex gap-2 text-sm cursor-pointer">
                Do not have an account?{" "}
                <span className="underline">Sign Up</span>
              </span>
            </Link>
          )}
        </div>
      </div>
      <Toaster richColors />
    </form>
  );
};

export default FormComponent;
