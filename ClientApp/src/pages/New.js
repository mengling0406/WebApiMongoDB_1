
const entry = {
    id: "",
    firstName: "",
    lastaNme: "",
    department: "",
    className: "",
    gender: 0,
    dateOfBirth: new Date(),
    isGraduated: false,
    age: 0
};

export default function New(props) {
    const addNewStudent = () => {
        console.log("The New Student Is: ", entry);

        fetch("api/student", {
            method: "POST",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }

        }).then(r => {
            console.log("Response from Backend for adding new student: ", r);
            window.location = "/";
        }).catch(e => console.log("Error adding new student: ", e));
    };

    const newData = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value;

        if (name_ === "dateOfBirth") {
            v_ = new Date(v_);
            entry.age = new Date().getFullYear() - v_.getFullYear()
        }

        if (name_ === "gender") {
            v_ = Number(v_);
        }

        if (name_ === "isGraduated") {
            v_ = v_ === "1";
        }

        entry[name_] = v_;

        console.log("The New Student Is: ", entry);
    };


    return (
        <section>
            <div style={{ margin: '3rem', padding: '5rem', border: '1px solid #CCCCCC' }}>
                <h4>Add New Student</h4>
                <hr></hr>
                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="fn">First Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="firstName" id="fn" onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="ln">Last Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="lastName" id="ln" onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="cn">Class Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" name="className" id="cn" onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="dp">Department</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="department" id="dp" onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-md-9">
                        <select className="form-select" name="gender" id="gender" onChange={newData}>
                            <option value={1}>Male</option>
                            <option value={0}>Female</option>
                        </select>
                    </div>
                </div>


                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="dob">Birthday</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="date" name="dateOfBirth" id="dob" onChange={newData} />
                    </div>
                </div>


                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="graduated">Is Graduated</label>
                    </div>
                    <div className="col-md-9">
                        <select className="form-select" name="isGraduated" id="graduated" onChange={newData}>
                            <option value={1}>Yes</option>
                            <option value={0}>No</option>
                        </select>
                    </div>
                </div>

                <div className="row marginTop5" style={{ marginTop: '2rem' }}>
                    <div className="col-md-6">
                        <button className="btn btn-secondary" style={{ padding: '5px 13px 5px 13px' }} onClick={() => window.location = "/"}>Back</button>
                    </div>
                    <div className="col-md-6" style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" style={{ padding: '5px 15px 5px 15px', marginRight: '10px' }} onClick={addNewStudent}>Add</button>
                    </div>
                </div>
            </div>


        </section>
    );

}