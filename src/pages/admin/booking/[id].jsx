import { useRouter } from 'next/router';
import NavBar from 'src/components/NavBar';
import NavBarAdmin from 'src/components/NavBarAdmin';

export default function Booking() {
    const router = useRouter();

    return (
        <>
            <NavBar />
            <p>Detail page of single Booking Page: {router.query.id}</p>;
        </>
    )
}