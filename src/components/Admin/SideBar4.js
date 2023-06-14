import { useRouter } from "next/router"

export default function SideBar4() {
    const { pathname } = useRouter()



    return (
        <>
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <a
                        className={`list-group-item ${pathname == '/admin/booking' ? 'active' : ''}  list-group-item-action list-group-item-light p-3`}
                        href="/admin/booking"
                    >
                        Bookings
                    </a>
                    <a
                        className={`list-group-item ${pathname == '/admin/category' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/category"
                    >
                        Categories
                    </a>
                    <a
                        className={`list-group-item ${pathname == '/admin/room' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/room"
                    >
                        Room
                    </a>
                    <a
                        className={`list-group-item ${pathname == '/admin/finance' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3`}
                        href="/admin/finance"
                    >
                        Finance
                    </a>
                    {/* <a
                        className={`list-group-item ${pathname == '/admin/profile' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3`}
                        href="/admin/profile"
                    >
                        Profile
                    </a> */}
                    <a
                        className={`ist-group-item ${pathname == '/admin/parking' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/parking" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.125)" }}
                    >
                        Parking
                    </a>
                </div>
            </div>
        </>
    )

}