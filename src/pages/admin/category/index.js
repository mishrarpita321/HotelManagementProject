import Link from "next/link"
import { useState } from "react"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import NavBar from "src/components/NavBar"
import NoCloseModal from "src/components/modal/NoCloseModal"

export default function Categories() {
    const [categoriesList, setCategoriesList] = useState(
        [
            {
                id: 1,
                name: 'Delux-1',
                rooms: 5,
                internet: true
            }, {
                id: 2,
                name: 'Delux-2',
                rooms: 5,
                internet: true

            }, {
                id: 3,
                name: 'Delux-3',
                rooms: 5,
                internet: true

            }
        ]
    )


    const [showAddDialog, setShowAddDialog] = useState()

    return (
        <>
            <NavBar />
            <div className="container">
                <h1>Categories</h1>
                <button onClick={() => setShowAddDialog(true)} > add +</button>
                <ul>
                    {categoriesList.map((category, i) => {
                        return (
                            <li>
                                <Link href={`/admin/category/${category.id}`} >
                                    {category.name}
                                </Link>
                            </li>
                        )
                    })}
                </ul>


                <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                    <AddCategoryDialog />
                </NoCloseModal>


            </div >
        </>
    )
}