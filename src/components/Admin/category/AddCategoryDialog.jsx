import SideBar4 from "../SideBar4"

export default function AddCategoryDialog() {
    const onClick = () => {
        setFormStep(1)
        setShowLogin(false)
    }

    return (
        <>
            <div className="container">
                {/* <div className="lab"><label
                    onClick={onClick}
                    className="close-btn LoginCloseBtn" title="close">
                    ×
                </label>
                </div> */}
                <div className="row categoryForm">
                    <h5>Add category</h5>
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="row"><label>Category name</label></div>
                                <div className="row"><input type="text" /></div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label>Size (sq.mt)</label>
                                </div>
                                <div className="row">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label>Price</label>
                                </div>
                                <div className="row">
                                    <input type="text" />
                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label>Capacity</label>
                                </div>
                                <div className="row">
                                    <input type="number" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label>Rooms</label>
                                </div>
                                <div className="row">
                                    <input type="number" />
                                </div>
                            </div>
                        </div>
                        <div className="row" style={{display: "flex"}}>
                            <button className="loginButton" style={{width: "78px", marginRight: "5px"}}>Save</button>
                            <button className="loginButton" style={{width: "78px"}}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}