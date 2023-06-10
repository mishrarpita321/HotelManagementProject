// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuthProvider } from "src/context/AuthContext";


const AuthGuard = (props) => {
  // console.log('inside Admin Guard')
  const { children, fallback, pageType } = props;
  const auth = useAuthProvider();
  const router = useRouter();
  useEffect(
    () => {
      if (!router.isReady) {
        return;
      }
      // console.log('auth.user $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', auth.user)
      // console.log('role $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$', JSON.parse(window.localStorage.getItem('userData')).role)

      if (auth.user === null && !window.localStorage.getItem("accessToken")) {
        // console.log('$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$',auth)
        if (router.asPath !== "/admin/login/") {
          router.replace({
            pathname: "/admin/login",
            // query: { requireAuth: true, returnUrl: router.asPath },
            query: { returnUrl: router.asPath },
          });
        } else {
          router.replace({
            pathname: "/",
            // query: { requireAuth: true, returnUrl: router.asPath },
          });
        }
      }
      else if (auth.user === null && (JSON.parse(window.localStorage.getItem("userData")).role != '[ADMIN]')) {
        // console.log('%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%');
        router.replace({
          pathname: "/",
          // query: { requireAuth: true, returnUrl: router.asPath },
        });
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [router.route, router.isReady]
  );
  if (auth.loading || auth.user === null) {
    return fallback;
  }
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', auth)
  // console.log('@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@', window.localStorage.getItem('userData').role)

  return <>{children}</>;
};

export default AuthGuard;
