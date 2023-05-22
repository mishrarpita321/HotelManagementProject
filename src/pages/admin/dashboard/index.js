export default function Dashboard(params) {
    return (
        <>
            <h1>
                This is admin dashboard page.
            </h1>
        </>
    )
}
Dashboard.guestGuard = false
Dashboard.authGuard = true
Dashboard.adminGuard = true