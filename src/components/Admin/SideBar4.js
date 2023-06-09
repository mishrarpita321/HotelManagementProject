export default function SideBar4() {




    return (
        <>
            <div className="border-end bg-white" id="sidebar-wrapper">
            <div className="list-group list-group-flush">
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!"
                    >
                        Bookings
                    </a>
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!"
                    >
                        Categories
                    </a>
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!"
                    >
                        Room
                    </a>
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!"
                    >
                        Finance
                    </a>
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!"
                    >
                        Profile
                    </a>
                    <a
                        className="list-group-item list-group-item-action list-group-item-light p-3"
                        href="#!" style={{borderBottom: "1px solid rgba(0, 0, 0, 0.125)"}}
                    >
                        Parking
                    </a>
                </div>
            </div>
        </>
    )

}