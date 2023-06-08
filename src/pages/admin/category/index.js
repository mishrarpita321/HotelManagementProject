import Link from "next/link"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import SideBar4 from "src/components/Admin/SideBar4"
import AddCategoryDialog from "src/components/Admin/category/AddCategoryDialog"
import AddCategoryForm from "src/components/Admin/category/AddCategoryForm"
import AddCategoryForm2 from "src/components/Admin/category/AddCategoryForm2"
import NavBar from "src/components/NavBar"
import TitleBanner from "src/components/TitleBanner"
import NoCloseModal from "src/components/modal/NoCloseModal"
import { fetchCategoriesList } from "src/store/admin/category"
import { Buffer } from 'buffer'

export default function Categories() {
    const [showAddDialog, setShowAddDialog] = useState(false)
    const dispatch = useDispatch()
    const store = useSelector(state => state.category)





    // const [rooms, setrooms] = useState([])
    const [categories, setCategories] = useState([])

    // ** Hooks

    console.log(store.data)
    useEffect(() => {
        dispatch(
            fetchCategoriesList({
            })
        )
        console.log(typeof (store.data))
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





    function byteArrayToBase64(byteArray) {
        const buffer = Buffer.from(byteArray);
        const base64 = buffer.toString('base64');
        console.log(base64)
        return base64;
    }

    return (
        <>
            <NavBar />
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
                                {categories.map((category, i) => {
                                    const decompressedImage = decompressBase64(category.imageData);

                                    // var utf8 = require('utf8');
                                    // var binaryToBase64 = require('binaryToBase64');

                                    // // var text = 'foo © bar 𝌆 baz';
                                    // // var bytes = utf8.encode(text);
                                    // var encoded = binaryToBase64(category.imageData);
                                    // console.log(encoded);




                                    return (
                                        <tr key={i}>
                                            <th scope="row">{category?.title}</th>
                                            <td>{category?.rooms}</td>
                                            <td>{category?.size}</td>
                                            <td>{category?.price}</td>
                                            {/* <td>{(room?.cleaning ? (<>true</>) : (<>false</>))}</td> */}
                                            <td>
                                                <img src={`data:image/jpeg;base64,${byteArrayToBase64(category.imageData)}`} style={{ height: "200px", width: "200px" }}></img>
                                                {/* <img src={`data:${getImageFormat(category.imageData)};base64,${encoded}`} style={{ height: "200px", width: "200px" }}></img> */}
                                                {/* <img src={`data:image/png;base64,${decompressedImage}`} style={{ height: "200px", width: "200px" }}></img> */}
                                                {/* <img src={`data:image/jpeg;base64,`} style={{ height: "200px", width: "200px" }}></img> */}
                                            </td>
                                            <td>{category.maxPeopleAllowed}</td>
                                            <td>
                                                <button className="edit">Edit</button>
                                                <button className="delete">Delete</button>
                                            </td>
                                        </tr>
                                    )

                                })}
                            </tbody>
                        </table>
                    </div>

                    <NoCloseModal show={showAddDialog} onHide={() => { setShowAddDialog(false) }}>
                        {/* <AddCategoryDialog /> */}
                        {/* <AddCategoryForm setShowAddDialog={() => { setShowAddDialog(false) }} /> */}
                        <AddCategoryForm2 setShowAddDialog={() => { setShowAddDialog(false) }} />
                    </NoCloseModal>
                </div>
            </div >
        </>
    )
}
Categories.guestGuard = false
Categories.authGuard = true
Categories.adminGuard = true