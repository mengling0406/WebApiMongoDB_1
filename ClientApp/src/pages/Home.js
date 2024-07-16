import { useEffect, useState } from "react";
import { FaPlus, FaEdit, FaTrash } from 'react-icons/fa';
import 'bootstrap/dist/css/bootstrap.min.css';


export default function Home() {

  const [students, setStudents] = useState([]);
  const [sid, setSid] = useState("");

  const handleModal = (hide) => {
    const deleteModal = document.querySelector(".delete-modal");
    if (deleteModal) {
      if (hide) {
        deleteModal.classList.add("hidden");
      } else {
        deleteModal.classList.remove("hidden");
      }

    }
  };

  const openDeleteModal = (id) => {
    setSid(id);
    handleModal(false);
  };
  const deleteStudent = () => {
    // console.log( "The Student ID: ", sid );
    // return;
    fetch("api/student/" + sid, {
      method: "DELETE",
    }).then(r => {
      console.log("Response for deleting a student: ", r);
      handleModal(true);
      window.location.reload();

    }).catch(e => console.log("Error deleting a student: ", e));
  };

  useEffect(() => {
    fetch("api/student").then(r => r.json()).then(d => {
      console.log("The students are: ", d);
      setStudents(d);
    }).catch(e => console.log("The error fetching all students: ", e));
  }, []);
  return (
    <main style={{ marginTop: '2rem' }}>
      <div className="row">
        <div className="col-md-11">
          <h4>Student Manager Application</h4>
        </div>
        <div className="col-md-1">
          <button className="btn btn-primary w-100" style={{ padding: '0 0 5px 0' }} onClick={() => window.location.href = "/new"}>
            <FaPlus />
          </button>
        </div>
      </div>

      <table className="table table-hover border border-2 border-secondary">
        <thead className="table-dark">
          <tr>
            <th></th>
            <th></th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Class Name</th>
            <th>Department</th>
            <th>Gender</th>
            <th>Birthday</th>
            <th>Graduated</th>
            <th>Age</th>

          </tr>
        </thead>
        <tbody>
          {
            students.length === 0 ? <tr className="row waiting"><td className="row">Loading<span className="loading">...</span></td></tr> :
              students.map(student => <tr key={student.id}>
                <td><a href={"/edit?id=" + student.id}><FaEdit /></a></td>
                <td className="delete-icon" onClick={() => { openDeleteModal(student.id); }}><FaTrash /></td>
                <td>{student.firstName}</td>
                <td>{student.lastName}</td>
                <td>{student.className}</td>
                <td>{student.department}</td>
                <td>{student.gender === 0 ? "Female" : "Male"}</td>
                <td>{student.dateOfBirth.split("T")[0]}</td>
                <td>{student.isGraduated ? "Yes" : "No"}</td>
                <td>{student.age}</td>

              </tr>)
          }
        </tbody>
      </table>

      <section className="delete-modal hidden">
        <div className="modal-item">
          <h4>Delete Student</h4>
          <p>Are you sure you want to delete this student?</p>
          <div className="row">
            <button className="btn btn-danger" onClick={deleteStudent}>Yes, Delete</button>
            <button className="btn btn-secondary" style={{ marginTop: '5px' }} onClick={() => { handleModal(true); }}>Cancel</button>
          </div>
        </div>
      </section>

    </main>
  );
}