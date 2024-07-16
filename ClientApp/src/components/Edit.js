import { useEffect, useState } from "react";

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

export default function Edit(props) {

    const [data, setData] = useState({});
    const [gender, setGender] = useState(0);
    const [graduated, setGraduated] = useState(false);
    const [sid, setSid] = useState("");

    const updateStudent = () => {
        console.log("The New Student Is: ", entry);

        fetch("api/student/" + sid, {
            method: "PUT",
            body: JSON.stringify(entry),
            headers: {
                "content-type": "application/json"
            }

        }).then(r => {
            console.log("Response for updating a student: ", r);
            window.location = "/";
        }).catch(e => console.log("Error updating a student: ", e));
    };

    const newData = (e) => {
        const name_ = e.target.name;
        let v_ = e.target.value;

        if (name_ === "dateOfBirth") {
            v_ = new Date(v_);
            entry.age = new Date().getFullYear() - v_.getFullYear();
        }

        if (name_ === "gender") {
            v_ = Number(v_);
            setGender(v_);
        }

        if (name_ === "isGraduated") {
            v_ = v_ === "true";
            setGraduated(v_);
        }

        entry[name_] = v_;

    };

    useEffect(() => {
        let id_ = window.location.search;
        if (id_) {
            id_ = id_.split("=")[1];
        }

        if (id_) {
            setSid(id_);

            fetch("api/student/" + id_).then(r => r.json()).then(d => {
                console.log("Student for update: ", d);
                setGender(d.gender);
                setGraduated(d.graduated);
                setData(d);
                Object.assign(entry, d);
            }).catch(e => console.log("Error getting student for update: ", e));
        }

    }, []);

    return (
        <section>
            <div style={{ margin: '3rem', padding: '5rem', border: '1px solid #CCCCCC' }}>
                <h4>Update Student</h4>
                <hr></hr>
                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="fn">First Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="firstName" id="fn" defaultValue={data.firstName} onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="ln">Last Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="lastName" id="ln" defaultValue={data.lastName} onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="cn">Class Name</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="className" id="cn" defaultValue={data.className} onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="dp">Department</label>
                    </div>
                    <div className="col-md-9">
                        <input className="form-control" type="text" name="department" id="dp" defaultValue={data.department} onChange={newData} />
                    </div>
                </div>

                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="gender">Gender</label>
                    </div>
                    <div className="col-md-9">
                        <select className="form-select" name="gender" id="gender" value={gender} onChange={newData}>
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
                        <input className="form-control" type="date" name="dateOfBirth" id="dob" defaultValue={data.dateOfBirth ? data.dateOfBirth.split("T")[0] : ''} onChange={newData} />
                    </div>
                </div>


                <div className="row marginTop5">
                    <div className="col-md-3">
                        <label htmlFor="graduated">Is Graduated</label>
                    </div>
                    <div className="col-md-9">
                        <select className="form-select" name="isGraduated" id="graduated" value={graduated} onChange={newData}>
                            <option value={true}>Yes</option>
                            <option value={false}>No</option>
                        </select>
                    </div>
                </div>

                <div className="row marginTop5" style={{ marginTop: '2rem' }}>
                    <div className="col-md-6">
                        <button className="btn btn-secondary" style={{ padding: '5px 13px 5px 13px' }} onClick={() => window.location = "/"}>Back</button>
                    </div>
                    <div className="col-md-6" style={{ textAlign: 'right' }}>
                        <button className="btn btn-primary" style={{ padding: '5px 15px 5px 15px', marginRight: '10px' }} onClick={updateStudent}>Update</button>
                    </div>
                </div>
            </div>
        </section>
    );
}