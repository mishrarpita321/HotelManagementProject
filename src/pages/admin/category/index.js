import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SideBar4 from "src/components/Admin/SideBar4"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import PropertyForm from "src/components/Admin/category/AddCategoryForm"
import NavBar from "src/components/NavBar"
import NoCloseModal from "src/components/modal/NoCloseModal"
import { fetchCategoriesList } from "src/store/admin/category"

export default function Categories() {
    const [showAddDialog, setShowAddDialog] = useState(false)
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

    // ** Hooks
    const dispatch = useDispatch()
    const store = useSelector(state => state.categoriesList)
    console.log(store)
    useEffect(() => {
        dispatch(
            fetchCategoriesList({
            })
        )
    }, [dispatch])

    return (
        <>
            <NavBar />
            <div className="row container">
                <div className="col-2">
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <h1>Categories</h1>
                    <button onClick={() => setShowAddDialog(true)} > add +</button>
                    <ul>
                        {categoriesList.map((category, i) => {
                            return (
                                <li key={category.id}>
                                    <Link href={`/admin/category/${category.id}`} >
                                        {category.name}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>

                    <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                        {/* <AddCategoryDialog /> */}
                        <PropertyForm setShowAddDialog={() => { setShowAddDialog(false) }} />
                    </NoCloseModal>
                </div>
            </div >
        </>
    )
}
Categories.guestGuard = false
Categories.authGuard = true
Categories.adminGuard = true