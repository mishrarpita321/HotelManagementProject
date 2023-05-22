import GuestGuard from 'src/Guards/GuestGuard';
import '../../styles/globals.css'
import { AuthProvider } from '../context/AuthContext'
import AuthGuard from 'src/Guards/AuthGuard';
import LoadingSpinner from 'src/components/LoadingSpinner';

const Guard = ({ children, guestGuard, authGuard, adminGuard, pageType }) => {
  // console.log('children is ', children)
  // console.log('values', guestGuard, authGuard, adminGuard, pageType)

  let visibility;
  if (adminGuard) {
    // Page visible to logged-in admins
    visibility = ("Page is visible to logged-in admins");
  } else if (authGuard) {
    // Page visible to logged-in users (excluding admins)
    return <AuthGuard fallback={<div className="h-screen flex items-center justify-center"><LoadingSpinner /></div>} pageType={pageType}>{children}</AuthGuard>;
    visibility = ("Page is visible to logged-in users");
  } else {
    // Page visible to all users
    visibility = ("Page is visible to all users");
    // console.log('children is ', children)
    return <GuestGuard fallback={<>Loading....guestGuard....</>} pageType={pageType}>{children}</GuestGuard>;
  }

  console.log(visibility)


};

function MyApp({ Component, pageProps }) {
  // Variables
  const getLayout = Component.getLayout ?? ((page) => { return page });
  const guestGuard = Component.guestGuard ?? false;
  const authGuard = Component.authGuard ?? false;
  const adminGuard = Component.adminGuard ?? false;
  const pageType = Component.pageType ?? 'user';
  return (
    <>
      <AuthProvider>
        <Guard guestGuard={guestGuard} authGuard={authGuard} adminGuard={adminGuard} pageType={pageType}>
          {getLayout(<Component {...pageProps} />)}
        </Guard>
      </AuthProvider>
    </>
  )
}

export default MyApp
