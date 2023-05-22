export default function Profile(params) {
    return (
        <>
            <h1>This is the user Profile Page</h1>
        </>
    )
}
Profile.guestGuard = false
Profile.authGuard = true
Profile.adminGuard = false