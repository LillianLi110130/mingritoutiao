import { useEffect } from "react";
import { useRouter } from "next/router";
import { user_status } from "../utils/localUtils";

export function useAuth() {
  const router = useRouter();
  const { asPath } = router;
  useEffect(() => {
    const token = user_status.getUser();
    if (!token) {
      router.push({
        pathname: "/login",
        query: {
          as: asPath,
        },
      });
    }
  }, []);
}
