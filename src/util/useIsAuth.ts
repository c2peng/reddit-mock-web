import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCreatePostMutation, useMeQuery } from "../generated/graphql";

export const useIsAuth = () => {
  const [, createPost] = useCreatePostMutation();
  const router = useRouter();
  const [{ data, fetching }] = useMeQuery();
  useEffect(() => {
    if (!data?.me && !fetching) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router, fetching]);
};
