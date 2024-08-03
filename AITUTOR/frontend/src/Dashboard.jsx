import React from 'react';
import Sidebar from './sidebar';
import Content from './Content.jsx';
import './css/dashboard.css';

const Dashboard = () => {
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='dashboard--content'>
        <Content />
      </div>
    </div>
  );
};

export default Dashboard;
