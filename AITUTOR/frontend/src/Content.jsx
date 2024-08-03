import React, { useState } from "react";
import axios from "axios";
import './css/content.css';

const Content = () => {
    const [textInput, setTextInput] = useState('');
    const [responseData, setResponseData] = useState([]);

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/sort-scholarships', { input: textInput });
            setResponseData(response.data);
        } catch (error) {
            console.error('Error sending data:', error);
        }
    };

    return (
        <div className="content">
            <h1>who are you?</h1>
            
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
                    {/* Other input fields */}
                    <label htmlFor="LGBTQ+">LGBTQ+</label>
                    <input type="checkbox" id="LGBTQ+" name="LGBTQ+" />
                    
                    <label htmlFor="financial">Financial Need</label>
                    <input type="checkbox" id="financial" name="financial" />
                    
                    <label htmlFor="average">Average</label>
                    <input type="number" id="average" name="average" max="100" className="average"/>
                    
                    <label className="race" htmlFor="race">Race: </label>
                    <select id="race">
                        <option value="White">White</option>
                        <option value="Black">Black</option>
                        <option value="Asian">Asian</option>
                        <option value="Indigenous">Indigenous</option>
                        <option value="Latinx">Latinx</option>
                    </select>
                    
                    <label htmlFor="gender">Gender: </label>
                    <select id="gender">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    
                    <label htmlFor="income">Family Income: </label>
                    <select id="income">
                        <option value="<$30,000">Less than $30,000 </option>
                        <option value="$30,000 - $60,000">$30,000 - $60,000</option>
                        <option value="$60,000 - $90,000">$60,000 - $90,000</option>
                        <option value="$90,000 - $120,000">90,000 - $120,000</option>
                        <option value="$120,000 - $150,000">$120,000 - $150,000</option>
                        <option value="$150,000 +">$150,000 +</option>
                    </select>
                </div>
            </div>

            <p className="description">*Please provide an accurate description so we can pair you with the most relevant scholarships and programs.</p>
            <input className="sign-button" type="button" value="Submit" onClick={handleSubmit} />

            {/* Display results if needed */}
            {responseData.length > 0 && (
                <div>
                    <h2>Top Scholarships:</h2>
                    <ul>
                        {responseData.map((item, index) => (
                            <li key={index}>{item.Name} - {item.Amount}</li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default Content;
