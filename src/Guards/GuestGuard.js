// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuthProvider } from "src/context/AuthContext";
// import { AuthContext, AuthProvider } from "src/context/AuthContext";
const GuestGuard = (props) => {
  console.log('Inside GuestGuard')
  const { children, fallback, pageType } = props;
  console.log('children,fallback,pageType=', children, fallback, pageType)
  const auth = useAuthProvider();
  // const auth = ;
  const router = useRouter();
  useEffect(() => {
    console.log('inside useEffect')
    if (!router.isReady) {
      console.log('router is not ready')
      return;
    }
    if (window.localStorage.getItem("userData")) {
      console.log('contain userDate')
      router.replace("/");
      console.log('value of router', router)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route]);


  if (auth.loading || (!auth.loading && auth.user !== null)) {
    console.log('value of auth.loading,', auth.loading)
    return fallback;
  }
  // console.log('2222222222222222222222222222222222')

  console.log('final return')
  return <>{children}</>;
};

export default GuestGuard;
