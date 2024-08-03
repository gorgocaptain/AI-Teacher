import React from "react";
import Sidebar from "./sidebar";
const Options = () => {
    return (
      <div className='dashboard'>
        <Sidebar/>
        <div className='dashboard--content'>
            <div>
                <h1>Based on your profile...</h1>
                <h2>These scholarships are your best fit: </h2>
                <h2>These universities are your best fit: </h2>
            </div>
        </div>
      </div>
    );
  };
  
  export default Options;
  