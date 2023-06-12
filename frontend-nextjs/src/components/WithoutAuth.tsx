"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

const WithoutAuth = <P extends {}>(
  WrappedComponent: React.ComponentType<P>
) => {
  const Wrapper = async (props: P) => {
    const { isAuthenticated } = useAuth();
    const router = useRouter();

    useEffect(() => {
      if (isAuthenticated) {
        router.push("/home");
      }
    }, []);

    return !isAuthenticated ? <WrappedComponent {...props} /> : <></>;
  };

  return Wrapper;
};

export default WithoutAuth;
