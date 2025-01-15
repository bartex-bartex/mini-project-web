import {useState, useEffect} from 'react'

function DoctorList() {
    const [doctors, setDoctors] = useState([])

    useEffect(() => {
        fetch("http://localhost:3001/api/doctors")
            .then(response => response.json())
            .then(data => {
                setDoctors(data)
            })
            .catch(error => {
                console.error('Can not fetch doctors: ', error)
            })
    });

    return (
        <div>
            <h1>Doctor List</h1>
            <ul>
                {doctors.map(doctor => (
                    <li key={doctor.id}>{doctor.name}</li>
                ))}
            </ul>
        </div>
    );
}

export default DoctorList;