import { useLayoutEffect } from "react";
import { useRouter } from "next/router";
import { user_status } from "../utils/localUtils";
import { current_router_status } from "../utils/memoryUtils";

export function useAuth() {
  const router = useRouter();
  const { pathname } = router;
  useLayoutEffect(() => {
    const token = user_status.getUser();
    if (!token) {
      current_router_status.setCurrent(pathname);
      router.push("/login");
    }
  }, []);
}
