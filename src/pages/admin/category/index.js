import Link from "next/link"
import { useContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SideBar4 from "src/components/Admin/SideBar4"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import AddCategoryForm from "src/components/Admin/category/AddCategoryForm"
import AddCategoryForm2 from "src/components/Admin/category/AddCategoryForm2"
import EditCategoryForm from "src/components/Admin/category/EditCategoryForm"
import NavBar from "src/components/NavBar"
import NavBarAdmin from "src/components/NavBarAdmin"
import TitleBanner from "src/components/TitleBanner"
import ImageModal from "src/components/modal/ImageModal"
import NoCloseModal from "src/components/modal/NoCloseModal"
import { AlertContext } from "src/context/AlertContext"
import { fetchCategoriesList, deleteCategory } from "src/store/admin/category"




export default function Categories() {
    const [showAddDialog, setShowAddDialog] = useState(false)
    const [showEditDialog, setShowEditDialog] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.category)
    const { showAlert } = useContext(AlertContext);




    // const [rooms, setrooms] = useState([])
    const [categories, setCategories] = useState([])

    // ** Hooks

    useEffect(() => {
        dispatch(
            fetchCategoriesList({
            })
        )
    }, [dispatch])


    useEffect(() => {
        setCategories(store.data)
    }, [store])



    const decompressBase64 = (base64Data) => {
        // const compressedData = atob(base64Data);
        // const inflatedData = inflate(new Uint8Array([...compressedData].map(char => char.charCodeAt(0))));
        // return inflatedData;
    }

    const getImageFormat = (data) => {
        // Identify the image format based on the data
        const mimeType = 'image/png'; // Default to PNG format if not recognized

        // Extract the first few bytes of the data
        const bytes = data.substring(0, 8);

        // Check for known file signatures to identify the format
        if (bytes.startsWith('data:image/jpeg') || bytes.startsWith('/9j/')) {
            return 'image/jpeg';
        }
        if (bytes.startsWith('data:image/png') || bytes.startsWith('iVBORw')) {
            return 'image/png';
        }
        if (bytes.startsWith('data:image/gif') || bytes.startsWith('R0lGOD')) {
            return 'image/gif';
        }
        // Add more format checks if necessary

        return mimeType; // Return the default MIME type if the format is not recognized
    };





    const [editRow, setEditRow] = useState(null);

    const handelOnEditClicked = (category) => {
        setEditRow(category)
        setShowEditDialog(true)
    }
    const onAlertErrorHandle = (message) => {
        showAlert('error', message, () => {
            console.log('Ok button clicked');
        });
    };

    const onAlertSuccessHandle = (message) => {
        showAlert('success', message, () => { }, () => { }, () => {
            setShowEditDialog(false)
        });
    };

    const handleOnDeleteClicked = (category) => {
        showAlert('confirmation', 'Are you sure to delete this category?', () => {
            dispatch(deleteCategory(category?.id)).then((data) => {
                if (data?.payload?.status === 'success') {
                    onAlertSuccessHandle(data?.payload?.message);
                } else {
                    onAlertErrorHandle(data?.payload?.message);
                }
            })
        }, () => {
            console.log('Cancel is clicked')
        });
        // setEditRow(category)
        // setShowEditDialog(true)
    }



    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <>
            <NavBarAdmin />
            <div className="row container">
                <div className="col-2">
                    <SideBar4 />
                </div>
                <div className="col-10">
                    <TitleBanner marginBotton={'40px'} padding={'7'} title={"Category"} />
                    {/* <h1>Categories</h1> */}
                    <div className="">
                        <button onClick={() => setShowAddDialog(true)} className="loginButton">+ Add Category</button>
                        <table className="table table-bordered table-hover transaction">
                            <thead className="thead-dark">
                                <tr style={{ backgroundColor: "#38325059" }}>
                                    <th scope="col">Name</th>
                                    <th scope="col">Rooms Available</th>
                                    <th scope="col">Size (sq.mt)</th>
                                    <th scope="col">Price</th>
                                    <th scope="col">Image</th>
                                    <th scope="col">Maximum Capacity</th>
                                    <th scope="col">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    categories.length !== 0 &&
                                    (
                                        categories.map((category, i) => (
                                            <tr key={category?.id}>
                                                <th scope="row">{category?.title}</th>
                                                <td>{category?.rooms}</td>
                                                <td>{category?.size}</td>
                                                <td>{category?.price}</td>
                                                <td>
                                                    {/* <img src={`data:${getImageFormat(category?.imageData)};base64,${category?.imageData}`} alt="Category Image" style={{ height: "200px", width: "200px" }}></img> */}
                                                    <img
                                                        src={`data:${getImageFormat(category?.imageData)};base64,${category?.imageData}`}
                                                        alt="Category Image"
                                                        style={{ height: "200px", width: "200px", cursor: "pointer" }}
                                                        onClick={() => setSelectedImage(`data:${getImageFormat(category?.imageData)};base64,${category?.imageData}`)}
                                                    />
                                                </td>
                                                <td>{category?.maxPeopleAllowed}</td>
                                                <td>
                                                    <button onClick={handelOnEditClicked.bind(this, category)} className="edit">Edit</button>
                                                    <button onClick={handleOnDeleteClicked.bind(this, category)} className="delete">Delete</button>
                                                </td>
                                            </tr>
                                        )
                                        )

                                    )
                                }
                            </tbody>
                        </table>
                    </div>

                    <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                        <AddCategoryForm2 setShowAddDialog={() => { setShowAddDialog(false) }} />
                    </NoCloseModal>
                    <NoCloseModal show={showEditDialog} onHide={() => { setShowEditDialog(false) }}>
                        <EditCategoryForm setShowEditDialog={() => { setShowEditDialog(false) }} editRow={editRow} setEditRow={setEditRow} />
                    </NoCloseModal>
                    
                    <ImageModal show={!!selectedImage} onHide={() => setSelectedImage(null)} image={selectedImage} />

                </div>
            </div >
        </>
    )
}
// Categories.guestGuard = false
// Categories.authGuard = true
// Categories.adminGuard = true