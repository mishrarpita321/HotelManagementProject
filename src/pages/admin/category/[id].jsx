import { useRouter } from 'next/router';
import NavBar from 'src/components/NavBar';
import NavBarAdmin from 'src/components/NavBarAdmin';

export default function Category() {
    const router = useRouter();

    return (
        <>
            <NavBar />
            <p>detail page of single category: {router.query.id}</p>;
        </>
    )
}