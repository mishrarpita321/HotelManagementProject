import Head from 'next/head'
import Image from 'next/image'
import styles from '../../../../styles/Home.module.css'
import { useState } from 'react';
import { useRouter } from 'next/router';
import { useAuthProvider } from 'src/context/AuthContext';
import NavBar from 'src/components/NavBar'

export default function Dashboard() {
    const auth = useAuthProvider();
    const router = useRouter();
    // const [loginModalOpen, setLoginModalOpen] = useState(true);
    // const [loginModalOpen, setLoginModalOpen] = useState(() => {
    //     return !!router.query.requireAuth ?? false;
    // });
    // const closeLoginModal = () => setLoginModalOpen(false);





    const handleLogin = (data) => {
        // setLoginLoading(true)
        // const { id, password } = data;
        // let id = email;
        auth.handleLoginInitial({ email: 'admin@gmail.com', password: 'password' }, (data) => {
            // setLoginLoading(false)
            if (data.message === "success") {
                // setEmail(id);
                // setStep(2);
            } else {
                if (data.message === "failed") {
                    if (data.type === 1) {
                        setError("password", {
                            // type: 'manual',
                            message: data.error.message,
                        });
                    } else {
                        setError("id", {
                            // type: 'manual',
                            message: data.error.message,
                        });
                    }
                } else {
                    setError("different", {
                        // type: 'manual',
                        message: data.error,
                    });
                }
            }
        });

    };




    return (
        <>
            {/* <h1>This is Admin Login page</h1> */}



            <div>
                <NavBar />
                <div className='container mt-4'>
                    <div style={{ justifyContent: "center" }} className='row '>
                        <div className='col-5'>
                            <div style={{ background: "unset" }} className="login">
                                <div style={{ display: "block", position: "unset", transform: "unset", width: "unset", borderRadius: "12px" }} className="container">
                                    <h1>Welcome Admin</h1>
                                    <form action="#">
                                        <label>Email or Phone</label>
                                        <input type="text" />
                                        <label>Password</label>
                                        <input type="password" />
                                        <button>Submit</button>
                                        <div className="forgetpwd"><a href="#">Forgot Password?</a></div>
                                        {/* <div className="link">
                                            Not a member? <a href="#" onClick={() => setPage("registration")} >Sigup here</a>
                                        </div> */}
                                        <closeform />
                                    </form>
                                </div>
                            </div>
                            {/* Roshan */}
                        </div>
                    </div>


                </div>

                {/* <button onClick={handleLogin}>Login</button> */}
            </div>



        </>
    )
}
Dashboard.guestGuard = false
Dashboard.authGuard = false
Dashboard.adminGuard = false
Dashboard.adminLoginGuard = true
