export default function Dashboard(params) {
    return (
        <>
            <h1>
                This is admin profile page.
            </h1>
        </>
    )
}
Dashboard.guestGuard = false
Dashboard.authGuard = false
Dashboard.adminGuard = true