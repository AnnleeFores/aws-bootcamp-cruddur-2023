"use client";
import ConfirmForm from "@/app/(auth)/confirm/components/ConfirmForm";

import SigninForm from "@/app/(auth)/signin/components/SigninForm";
import SignupForm from "@/app/(auth)/signup/components/SignupForm";
import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import LoadingSpinner from "./LoadingSpinner";

interface SignPage {
  type?: string;
}

const SignPage: React.FC<SignPage> = ({ type }) => {
  const [IsLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    setIsLoading(false);
  }, [isAuthenticated]);

  if (IsLoading) {
    return <LoadingSpinner />;
  }

  if (isAuthenticated) {
    router.push("/home");
  }

  return (
    <>
      <div className="flex bg-[#02060E] md:bg-inherit h-full w-full justify-center md:items-center">
        <div className="bg-[#02060E] text-white max-w-[500px] w-full rounded-lg">
          {type === "signin" ? (
            <SigninForm />
          ) : type === "signup" ? (
            <SignupForm />
          ) : (
            <ConfirmForm />
          )}
        </div>
      </div>
    </>
  );
};

export default SignPage;
