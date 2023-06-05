import GuestGuard from 'src/Guards/GuestGuard';
import AdminGuard from 'src/Guards/AdminGuard';
import '../../styles/globals.css'
import '../../styles/globals2.css'
import { AuthProvider } from '../context/AuthContext'
import AuthGuard from 'src/Guards/AuthGuard';
import LoadingSpinner from 'src/components/LoadingSpinner';
import AdminLoginGuard from 'src/Guards/AdminLoginGuard';

import "@fortawesome/fontawesome-svg-core/styles.css";
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false;

import 'bootstrap/dist/css/bootstrap.css'
import { AlertProvider } from 'src/context/AlertContext';
import Alert from 'src/components/Alert';



const Guard = ({ children, guestGuard, authGuard, adminGuard, adminLoginGuard, pageType }) => {
  // console.log('children is ', children)
  // console.log('i am called from ')

  let visibility;
  if (adminGuard) {
    // Page visible to logged-in admins
    visibility = ("Page is visible to logged-in admins");
    return <AdminGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AdminGuard>;
  } else if (authGuard) {
    // Page visible to logged-in users (excluding admins)
    return <AuthGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AuthGuard>;
    visibility = ("Page is visible to logged-in users");
  }
  else if (adminLoginGuard) {
    return <AdminLoginGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AdminLoginGuard>;
  }
  else {
    // Page visible to all users
    visibility = ("Page is visible to all users");
    // console.log('children is ', children)
    // return <GuestGuard fallback={<>Loading....guestGuard....</>} pageType={pageType}>{children}</GuestGuard>;
    return children;
  }

  // if (guestGuard === false) {
  //   if (authGuard === false && adminGuard === false) {
  //     // Code for rendering the page visible to all users
  //     return children
  //   } else if (authGuard === true && adminGuard === false) {
  //     // Code for rendering the page visible to logged-in users
  //     return <AuthGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AuthGuard>;
  //   } else if (authGuard === true && adminGuard === true) {
  //     // Code for rendering the page visible to logged-in admins
  //     return <AdminGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AdminGuard>;
  //   }
  // }

  console.log(visibility)


};

function MyApp({ Component, pageProps }) {
  // Variables
  const getLayout = Component.getLayout ?? ((page) => { return page });
  const guestGuard = Component.guestGuard ?? false;
  const authGuard = Component.authGuard ?? false;
  const adminGuard = Component.adminGuard ?? false;
  const adminLoginGuard = Component.adminLoginGuard ?? false;
  const pageType = Component.pageType ?? 'user';
  return (
    <>
      <AuthProvider>
        <Guard guestGuard={guestGuard} authGuard={authGuard} adminGuard={adminGuard} adminLoginGuard={adminLoginGuard} pageType={pageType}>
          <AlertProvider>
            {getLayout(<Component {...pageProps} />)}
            <Alert />
          </AlertProvider>
        </Guard>
      </AuthProvider>
    </>
  )
}

export default MyApp
