import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'; 
import './css/content.css';

const Content = () => {
    const [textInput, setTextInput] = useState('');
    const [responseData, setResponseData] = useState(() => {
        const savedData = localStorage.getItem('responseData');
        return savedData ? JSON.parse(savedData) : [];
    });
    const [isLGBTQChecked, setIsLGBTQChecked] = useState(false);
    const [isNeedChecked, setIsNeedChecked] = useState(false);
    const [average, setAverage] = useState(0);
    const [race, setRace] = useState(''); 
    const [gender, setGender] = useState(''); 
    const [income, setIncome] = useState(''); 

    useEffect(() => {
        localStorage.setItem('responseData', JSON.stringify(responseData));
    }, [responseData]);

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleLGBTQCheckboxChange = (event) => {
        setIsLGBTQChecked(event.target.checked);
    };

    const handleNeedCheckboxChange = (event) => {
        setIsNeedChecked(event.target.checked);
    };

    const handleAverageChange = (event) => {
        setAverage(event.target.value);
    };

    const handleRaceChange = (event) => {
        setRace(event.target.value);
    };

    const handleGenderChange = (event) => {
        setGender(event.target.value);
    };

    const handleIncomeChange = (event) => {
        setIncome(event.target.value);
    };

    const handleSubmit = async () => {
        let updatedInput = textInput;
        if (isLGBTQChecked) {
            updatedInput += " I am part of the LGBTQ community.";
        } else {
            updatedInput += " I am not part of the LGBTQ community.";
        }
        if (isNeedChecked) {
            updatedInput += " Financial Need: Yes";
        } else {
            updatedInput += " Financial Need: No";
        }
        updatedInput += ` Average: ${average}`;
        if (race) {
            updatedInput += ` Race: ${race}`; 
        }
        if (gender) {
            updatedInput += ` Gender: ${gender}`; 
        }
        if (income) {
            updatedInput += ` Family Income: ${income}`; 
        }
        try {
            const response = await axios.post('http://localhost:5000/sort-scholarships', { input: updatedInput });
            setResponseData(response.data);
            toast.success('Submission successful!');
        } catch (error) {
            console.error('Error sending data:', error);
            toast.error('There was an error with your submission.');
        }
    };

    return (
        <div className="content">
            <h1>Who are you?</h1>
            
            <div className="textarea-container">
                <textarea
                    name="Text1"
                    cols="100"
                    rows="15"
                    className="text-box"
                    value={textInput}
                    onChange={handleInputChange}
                ></textarea>
                <div className="stuff">
                    <label htmlFor="LGBTQ+">LGBTQ+</label>
                    <input type="checkbox" id="LGBTQ+" name="LGBTQ+" checked={isLGBTQChecked} onChange={handleLGBTQCheckboxChange} />
                    
                    <label htmlFor="financial">Financial Need</label>
                    <input  type="checkbox" id="financial" name="financial" checked={isNeedChecked} onChange={handleNeedCheckboxChange}/>
                    
                    <label htmlFor="average">Average</label>
                    <input type="number" id="average"  name="average" max="100" className="average" value={average} onChange={handleAverageChange}/>
                    
                    <label className="race" htmlFor="race">Race: </label>
                    <select id="race" value={race} onChange={handleRaceChange}>
                        <option value="">Select Race</option>
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Asian">Asian</option>
                        <option value="Indigenous">Indigenous</option>
                        <option value="Latinx">Latinx</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    <label htmlFor="gender">Gender: </label>
                    <select id="gender" value={gender} onChange={handleGenderChange}>
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    <label htmlFor="income">Family Income: </label>
                    <select id="income" value={income} onChange={handleIncomeChange}>
                        <option value="">Select Income Range</option>
                        <option value="<$30,000">Less than $30,000 </option>
                        <option value="$30,000 - $60,000">$30,000 - $60,000</option>
                        <option value="$60,000 - $90,000">$60,000 - $90,000</option>
                        <option value="$90,000 - $120,000">$90,000 - $120,000</option>
                        <option value="$120,000 - $150,000">$120,000 - $150,000</option>
                        <option value="$150,000 +">$150,000 +</option>
                    </select>
                </div>
            </div>

            <p className="description">*Please provide an accurate description so we can pair you with the most relevant scholarships and programs.</p>
            <input className="sign-button" type="button" value="Submit" onClick={handleSubmit} />

            {responseData.length > 0 && (
                <div>
                    <h2 className="scholarship-title">Top Scholarships:</h2>
                    <ul className="scholarship-unorder-list">
                        {responseData.map((item, index) => (
                            <li className="scholarship-list" key={index}>
                                {item.Name} - {item.Amount}
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <ToastContainer />
        </div>
    );
}

export default Content;
