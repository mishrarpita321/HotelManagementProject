import Head from 'next/head'
import Image from 'next/image'
import styles from '../../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';

export default function Home() {
  const router = useRouter();
  // const [loginModalOpen, setLoginModalOpen] = useState(true);
  const [loginModalOpen, setLoginModalOpen] = useState(() => {
    return !!router.query.requireAuth ?? false;
  });
  const closeLoginModal = () => setLoginModalOpen(false);



  return (
    <>
      <h1>This is home index page</h1>
      {/* <Modal isOpen={loginModalOpen} onClose={closeLoginModal}>
        <AuthPages />
      </Modal> */}



      {loginModalOpen &&
        <>
          <div>
            <button>Close</button>
          </div>
        </>
      }


    </>
  )
}
Home.guestGuard = false
Home.authGuard = false
Home.adminGuard = false
