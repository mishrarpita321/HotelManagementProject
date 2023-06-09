export default function ParkingForm() {
    return (
        <div>
            <div className="container">
                <div className="row categoryForm" style={{width: "unset"}}>
                    <h5>Add Parking</h5>
                    <form>
                        <div className="row">
                            <div className="col">
                                <div className="row">
                                    <label>Parking Type Name</label>
                                    <input type="text"></input>
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col">
                                <div className="row"><label>Cost Per Hour</label></div>
                                <div className="row"><input type="number" /></div>
                            </div>
                        </div>
                        <div className="row" style={{ marginTop: "13px", justifyContent: "center" }}>
                            <button className="loginButton" style={{ width: "78px" }}>Save</button>
                            <button className="loginButton" style={{ width: "78px", marginLeft: "20px" }}>Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}