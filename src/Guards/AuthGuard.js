// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuthProvider } from "src/context/AuthContext";


const AuthGuard = (props) => {
  console.log('inside Auth Guard')
  const { children, fallback, pageType } = props;
  const auth = useAuthProvider();
  const router = useRouter();
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      if (auth.user === null && !window.localStorage.getItem("accessToken")) {
        if (router.asPath !== "/") {
          router.replace({
            pathname: "/",
            query: { requireAuth: true, returnUrl: router.asPath },
          });
        } else {
          router.replace({
            pathname: "/",
            // query: { requireAuth: true, returnUrl: router.asPath },
          });
        }
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, router.isReady]
  );
  if (auth.loading || auth.user === null) {
    return fallback;
  }

  return <>{children}</>;
};

export default AuthGuard;
