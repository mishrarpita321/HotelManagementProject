export default function AddRoomDialog() {
    return (
        <>
            <div className="container">
                <div className="row categoryForm">
                    <h5>Add room</h5>
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="row"><label>Room No</label></div>
                                <div className="row"><input type="text" /></div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label>Category</label>
                                </div>
                                <div className="row">
                                    <select class="custom-select mr-sm-2">
                                        <option selected>Deluxe.</option>
                                        <option selected>Deluxe.</option>
                                        <option selected>Deluxe.</option>
                                        <option selected>Deluxe.</option>
                                        <option selected>Deluxe.</option>
                                        <option selected>Deluxe.</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label>Status</label>
                                </div>
                                <div className="row">
                                    <select class="custom-select mr-sm-2">
                                        <option selected>Please Select.</option>
                                        <option value="1">Booked.</option>
                                        <option value="2">Not Booked</option>
                                    </select>                                </div>
                            </div>
                            <div className="col">
                                <div className="row">
                                    <label>Inventory Available?</label>
                                </div>
                                <div className="row">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label>Cleaning Status?</label>
                                </div>
                                <div className="row">
                                    <input type="text" />
                                </div>
                            </div>
                        </div>
                        <button className="loginButton" style={{ width: "78px" }}>Save</button>
                    </form>
                </div>
            </div>        </>
    )


}