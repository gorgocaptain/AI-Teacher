import React from "react";
import Sidebar from "./sidebar";
import './css/essay.css'
const Essay = () => {
    return (
        <div className='dashboard'>
        <Sidebar/>
        <div className='dashboard--content'>
            <div>
                <h1>Supplementary Application</h1>
                <div className="textarea-container">
                <textarea
                    name="Text1"
                    cols="100"
                    rows="15"
                    className="text-box"
                    // value={textInput}
                    // onChange={handleInputChange}
                ></textarea>
                </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default Essay;
  