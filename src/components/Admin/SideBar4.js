import Link from "next/link"
import { useRouter } from "next/router"

export default function SideBar4() {
    const { pathname } = useRouter()



    return (
        <>
            <div className="border-end bg-white" id="sidebar-wrapper">
                <div className="list-group list-group-flush">
                    <Link
                        className={`list-group-item ${pathname == '/admin/booking' ? 'active' : ''}  list-group-item-action list-group-item-light p-3`}
                        href="/admin/booking"
                    >
                        Bookings
                    </Link>
                    <Link
                        className={`list-group-item ${pathname == '/admin/category' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/category"
                    >
                        Categories
                    </Link>
                    <Link
                        className={`list-group-item ${pathname == '/admin/room' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/room"
                    >
                        Room
                    </Link>
                    <Link
                        className={`list-group-item ${pathname == '/admin/finance' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3`}
                        href="/admin/finance"
                    >
                        Finance
                    </Link>
                    {/* <a
                        className={`list-group-item ${pathname == '/admin/profile' ? 'active' : ''} list-group-item list-group-item-action list-group-item-light p-3`}
                        href="/admin/profile"
                    >
                        Profile
                    </a> */}
                    <Link
                        className={`ist-group-item ${pathname == '/admin/parking' ? 'active' : ''} list-group-item-action list-group-item-light p-3`}
                        href="/admin/parking" style={{ borderBottom: "1px solid rgba(0, 0, 0, 0.125)" }}
                    >
                        Parking
                    </Link>
                </div>
            </div>
        </>
    )

}