import style from "../../styles/NavBar/navBar.module.css";
const NavBar = () => {
    return (
        <>
            {/* header */}
            <header>
                {/* header inner */}
                <div className={style.header}>
                    <div className={style.container}>
                        <div className={style.row}>
                            <div className={`col-xl-3 col-lg-3 col-md-3 col-sm-3 col logo_section`}>
                                <div className={style.full}>
                                    <div className={`center-desk`}>
                                        <div className={`logo`}>
                                            <a href="index.html">
                                                <img src="images/logo.png" alt="#" />
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-xl-9 col-lg-9 col-md-9 col-sm-9">
                                <nav className={`${style.navigation} navbar navbar-expand-md navbarDark`} >
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
                                        <ul className={`${style.navbarNav} navbar-nav mr-auto`} >
                                            <li className="nav-item ">
                                                <a className="navLink" href="index.html">
                                                    Home
                                                </a>
                                            </li>
                                            <li className="nav-item active">
                                                <a className="navLink" href="about.html">
                                                    About
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="navLink" href="room.html">
                                                    Our room
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="navLink" href="gallery.html">
                                                    Gallery
                                                </a>
                                            </li>
                                            <li className="nav-item">
                                                <a className="navLink" href="contact.html">
                                                    Contact Us
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
            </header>
            {/* end header inner */}
            {/* end header */}
        </>


    )
}
export default NavBar