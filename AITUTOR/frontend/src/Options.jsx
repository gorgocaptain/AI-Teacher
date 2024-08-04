import React, { useState } from "react";
import Sidebar from "./sidebar";
import './css/tuition.css';
import axios from 'axios';
import { saveAs } from 'file-saver';

const Tuition = () => {
    const [studentType, setStudentType] = useState("");
    const [university, setUniversity] = useState("");
    const [faculty, setFaculty] = useState("");
    const [program, setProgram] = useState("");
    const [residence, setResidence] = useState("");
    const [tuitionInfo, setTuitionInfo] = useState("");

    const handleSubmit = async () => {
        if (university && program && residence) {
            try {
                const response = await axios.post('http://localhost:5001/find_best_match', {
                    university,
                    program,
                    residence,
                    studentType
                });

                
                setTuitionInfo(response.data);
                saveTuitionInfo(response.data);
            } catch (error) {
                console.error('Error fetching tuition info:', error);
                setTuitionInfo("An error occurred while fetching tuition information.");
            }
        } else {
            setTuitionInfo("Please fill out all required fields.");
        }
    };

    const saveTuitionInfo = (info) => {
        try {
           
            const dataToExport = `
                Student Type: ${studentType}
                University: ${university}
                Faculty: ${faculty}
                Program: ${program}
                Residence: ${residence}
                
                Tuition Information:\n${info}
            `;

           
            const blob = new Blob([dataToExport], { type: 'text/plain;charset=utf-8' });
            saveAs(blob, 'tuition_information.txt');
        } catch (error) {
            console.error('Error exporting data:', error);
        }
    };

    return (
        <div className="container">
            <Sidebar />
            <div className="tuition">
                <h1>Tuition Calculator</h1>
                <div className="questions">
                    <h3 className="question">1. What type of student are you?</h3>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                id="domestic-student"
                                name="student-type"
                                value="domestic"
                                onChange={() => setStudentType("domestic")}
                            />
                            Domestic
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="international-student"
                                name="student-type"
                                value="international"
                                onChange={() => setStudentType("international")}
                            />
                            International
                        </label>
                    </div>
                    <h3 className="question">2. What University do you go to?</h3>
                    <label className="university" htmlFor="university">University: </label>
                    <select id="university" onChange={(e) => setUniversity(e.target.value)}>
                        <option value="">Select University</option>
                        <option value="Brock University">Brock University</option>
                        <option value="Wilfrid Laurier University">Wilfrid Laurier University</option>
                        <option value="University of Waterloo">University of Waterloo</option>
                        <option value="University of Toronto">University of Toronto</option>
                        <option value="York University">York University</option>
                        <option value="Other">Other</option>
                    </select>

                    <h3 className="question">3. What Faculty are you interested in?</h3>
                    <label className="faculty" htmlFor="faculty">Faculty: </label>
                    <select id="faculty" onChange={(e) => setFaculty(e.target.value)}>
                        <option value="">Select Faculty</option>
                        <option value="Arts">Faculty of Arts</option>
                        <option value="Mathematics">Faculty of Mathematics</option>
                        <option value="Engineering">Faculty of Engineering</option>
                        <option value="Science">Faculty of Science</option>
                        <option value="Business">Faculty of Business</option>
                        <option value="other">Other</option>
                    </select>

                    <h3 className="question">4. What Program are you interested in?</h3>
                    <label className="program" htmlFor="program">Program: </label>
                    <select id="program" onChange={(e) => setProgram(e.target.value)}>
                        <option value="">Select Program</option>
                        <option value="Computer Science">Computer Science</option>
                        <option value="Mechanical Engineering">Mechanical Engineering</option>
                        <option value="Life Sciences">Life Sciences</option>
                        <option value="Mathematics">Mathematics</option>
                        <option value="Business Administration">Business Administration</option>
                        <option value="Economics">Economics</option>
                        <option value="Physics">Physics</option>
                        <option value="Computer Engineering">Computer Engineering</option>
                        <option value="Health Sciences">Health Sciences</option>
                        <option value="Finance">Finance</option>
                    </select>

                    <h3 className="question">5. Where are you planning on living during the school year?</h3>
                    <div className="radio-group">
                        <label>
                            <input
                                type="radio"
                                id="on-campus"
                                name="residence"
                                value="on-campus"
                                onChange={() => setResidence("on-campus")}
                            />
                            On-Campus
                        </label>
                        <label>
                            <input
                                type="radio"
                                id="off-campus"
                                name="residence"
                                value="off-campus"
                                onChange={() => setResidence("off-campus")}
                            />
                            Off-Campus
                        </label>
                    </div>
                    <button className="sign-button" onClick={handleSubmit}>Calculate</button>
                    
                    {tuitionInfo && <div className="result">
                        <h3>Tuition Information:</h3>
                        <p> Your estimated tuition cost is approximately {tuitionInfo}</p>
                    </div>}
                </div>
            </div>
        </div>
    );
}

export default Tuition;
