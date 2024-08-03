import React from "react";
import './css/content.css';

const Content = () => {
    return (
        <div className="content">
            <h1>Who are you?</h1>
            
            <div className="textarea-container">
                <textarea name="Text1" cols="100" rows="15" className="text-box"></textarea>
                <div className="stuff">
                <label htmlFor="LGBTQ+">LGBTQ+</label>
                    <input type="checkbox" id="LGBTQ+" name="LGBTQ+" />
                    
                    <label htmlFor="financial">Financial Need</label>
                    <input type="checkbox" id="financial" name="financial" />
                    <label htmlFor="average">Average</label>
                    <input type="number" id="average" name="average" max="100" className="average"/>
                    <label htmlFor="race">Race: </label>
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
                </div>
            </div>

            <p>*Please provide an accurate description so we can pair you with the most relevant scholarships and programs.</p>
            <input className="sign-button" type="button" value="Submit" />
        </div>
    );
}

export default Content;
