import React from "react";
import {BiArchiveOut, BiBookAlt, BiHome, BiMessage, BiSolidReport, BiStats, BiTask, BiArchive} from 'react-icons/bi';
import "./css/sidebar.css";

const Sidebar = () => {
    return (
        <div className="menu">
            <div className="logo">
                <BiBookAlt className="logo-icon"/>
                <h2>Scholar Rank</h2>
            </div>
            <div className="menu--list">
                <a href="/dashboard" className="item">
                    <BiHome className="icon"/>
                    User
                </a>
                <a href="/essay" className="item">
                    <BiTask className="icon"/>
                    Essay
                </a>
                <a href="#" className="item">
                    <BiStats className="icon"/>
                    Stats
                </a>
                <a href="/options" className="item">
                    <BiSolidReport className="icon"/>
                    Options
                </a>
            </div>
            <div className="menu--export">
                <a href="/export" className="item">
                    <BiArchive className="icon"/>
                    Export
                </a>
            </div>
        </div>
    );
};

export default Sidebar;
