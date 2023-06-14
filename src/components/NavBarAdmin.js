import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
// import { logoutHelp } from "src/logout/logout";

export default function NavBarAdmin({ showLogin, setShowLogin }) {


    const [loggedIn, setloggedIn] = useState(true)

    const { pathname } = useRouter()
    const routerlog = useRouter()

    // const IsActive = pathname === url
    // const IsActive = pathname === url

    // const [showLogin, setShowLogin] = useState(false);
    const onClick = () => {
        // setShowLogin(true);
        setShowLogin(true)
    }
    const onLogoutClick = () => {
        logoutHelp('admin')
    }




    const logoutHelp = (user) => {


        // Remove all data from localStorage
        window.localStorage.clear();

        // Redirect the user based on the provided parameter
        if (user === 'user') {
            routerlog.push('/');
        } else if (user === 'admin') {
            routerlog.push('/admin/login');
        }
    };

    return (<>
        <header>
            {/* header inner */}
            <div className="header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section">
                            <div className="full">
                                <div className="center-desk">
                                    <div className="logo">
                                        <Link href="/">
                                            <img src="/images/logo_1.png" alt="#" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                            <nav className="navigation navbar navbar-expand-md navbar-dark ">
                                <button
                                    className="navbar-toggler"
                                    type="button"
                                    data-toggle="collapse"
                                    data-target="#navbarsExample04"
                                    aria-controls="navbarsExample04"
                                    aria-expanded="false"
                                    aria-label="Toggle navigation"
                                >
                                    <span className="navbar-toggler-icon" />
                                </button>
                                <div className="collapse navbar-collapse" id="navbarsExample04">
                                    <ul className="navbar-nav mr-auto">

                                        <li className="nav-item">

                                            {loggedIn ? (
                                                <>
                                                    {pathname == '/admin/login' ? (
                                                        <>
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span onClick={onLogoutClick} className="nav-link loginButton">
                                                                Logout
                                                            </span>
                                                        </>
                                                    )}

                                                </>
                                            ) : (
                                                <>
                                                    <span onClick={onClick} className="nav-link loginButton " >
                                                        Login
                                                    </span>
                                                </>
                                            )}


                                        </li>
                                    </ul>
                                </div>
                            </nav>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    </>)
}