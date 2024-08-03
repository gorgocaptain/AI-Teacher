import React, { useState } from "react";
import axios from 'axios';
import Sidebar from "./sidebar";
import './css/essay.css';

const Essay = () => {
    const [textInput, setTextInput] = useState('');
    const [feedback, setFeedback] = useState('');

    const handleInputChange = (event) => {
        setTextInput(event.target.value);
    };

    const handleSubmit = async () => {
        try {
            const response = await axios.post('http://localhost:5000/generate-essay-feedback', { input: textInput });
            console.log('Server response:', response.data);  // Add this line
            if (response.data && typeof response.data.feedback === 'string') {
                setFeedback(response.data.feedback);
            } else {
                setFeedback('Unexpected response format.');
            }
        } catch (error) {
            console.error('Error submitting essay:', error.response ? error.response.data : error.message);
            setFeedback('An error occurred while submitting the essay. Please try again.');
        }
    };
    

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboard--content'>
                <div>
                    <h1>Supplementary Application</h1>
                    <div className="textarea-container">
                        <textarea
                            name="Text1"
                            cols="100"
                            rows="15"
                            className="text-box"
                            value={textInput}
                            onChange={handleInputChange}
                            placeholder="Type your essay here..."
                        ></textarea>
                    </div>
                    <button onClick={handleSubmit} className="sign-button">Submit for Review</button>
                    {feedback && (
                        <div className="feedback-container">
                            <h3 className="feedback-title">Feedback:</h3>
                            <pre className="feedback-text">{feedback}</pre>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Essay;
