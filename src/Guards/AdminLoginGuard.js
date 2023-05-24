// ** React Imports
import { useEffect } from "react";

// ** Next Imports
import { useRouter } from "next/router";

// ** Hooks Import
import { useAuthProvider } from "src/context/AuthContext";


const AdminLoginGuard = (props) => {
  console.log('inside Admin Login Guard')
  const { children, fallback, pageType } = props;
  const auth = useAuthProvider();
  const router = useRouter();


  useEffect(() => {
    if (!router.isReady) {
      return
    }
    if (window.localStorage.getItem('userData')) {
      router.replace('/admin/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.route])
  if (auth.loading || (!auth.loading && auth.user !== null)) {
    return fallback
  }

  return <>{children}</>



  return <>{children}</>;
};

export default AdminLoginGuard;