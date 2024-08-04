import React, { useState } from 'react';
import Sidebar from './sidebar';
import './css/dashboard.css';
import './css/stats.css'; // Import the new CSS file
import axios from 'axios';
import Papa from 'papaparse';

const csvFiles = {
  brock: './brock_filtered.csv',
  york: './york_filtered.csv',
  toronto: './toronto_filtered.csv',
  laurier: './laurier_filtered.csv',
  waterloo: './waterloo_filtered.csv'
};

const universities = [
  { value: '', label: 'Select University' },
  { value: 'brock', label: 'Brock University' },
  { value: 'york', label: 'York University' },
  { value: 'toronto', label: 'University of Toronto' },
  { value: 'laurier', label: 'Wilfrid Laurier University' },
  { value: 'waterloo', label: 'University of Waterloo' }
];

const programs = [
  'Architecture & Planning', 'Biological & Biomedical Sciences', 'Commerce/Mgmt/Business Admin',
  'Communication & Journalism', 'Computer & Information Science', 'Engineering',
  'Health Profess & Related Programs', 'Kinesiology/Recreation/Physical Education',
  'Liberal Arts & Sciences/General Studies/Humanities', 'Mathematics & Statistics',
  'Physical Science', 'General Science', 'Social Sciences'
];

const gradeRanges = [
  '95%+', '90-94%', '85-89%', '80-84%', '75-79%', '70-74%', 'Below 70%'
];

const Stats = () => {
  const [university, setUniversity] = useState('');
  const [program, setProgram] = useState('');
  const [grade, setGrade] = useState('');
  const [acceptanceRate, setAcceptanceRate] = useState(null);
  const [error, setError] = useState('');

  const fetchData = async (file) => {
    try {
      const response = await axios.get(file);
      const parsedData = Papa.parse(response.data, { header: true });
      return parsedData.data;
    } catch (error) {
      setError('Error fetching data: ' + error.message);
      return [];
    }
  };

  const calculateAcceptanceRate = async () => {
    if (!university || !program || !grade) {
      setError('Please fill in all fields.');
      return;
    }
  
    const data = await fetchData(csvFiles[university]);
  
    if (data.length) {
      const programData = data.find(row => row.Program === program);
      if (programData) {
        const gradeIndex = gradeRanges.indexOf(grade);
        if (gradeIndex === -1) {
          setError('Invalid grade range selected.');
          return;
        }
  
        const gradeColumnIndex = 3 + gradeIndex; // Columns start from index 2
        const gradeColumnKey = Object.keys(programData)[gradeColumnIndex];
        const acceptanceRateValue = programData[gradeColumnKey];
  
        if (acceptanceRateValue) {
          setAcceptanceRate(acceptanceRateValue);
          setError('');
        } else {
          setError('No data available for the selected grade range.');
        }
      } else {
        setError('No data found for this program.');
      }
    } else {
      setError('No data found.');
    }
  };
  
  return (
    <div className='dashboard'>
      <Sidebar />
      <div className='content'>
        <h1>University Admission Stats</h1>

        <label htmlFor='university'>University:</label>
        <select
          id='university'
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
        >
          {universities.map((uni) => (
            <option key={uni.value} value={uni.value}>
              {uni.label}
            </option>
          ))}
        </select>
        <br></br>
        <label htmlFor='program'>Program:</label>
        <select
          id='program'
          value={program}
          onChange={(e) => setProgram(e.target.value)}
        >
            
          <option value=''>Select Program</option>
          {programs.map((prog) => (
            <option key={prog} value={prog}>
              {prog}
            </option>
          ))}
        </select>
          <br></br>
        <label htmlFor='grade'>Grade Range:</label>
        <select
          id='grade'
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        >
            <br></br>
          <option value=''>Select Grade Range</option>
          {gradeRanges.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>
        <br></br>

        <button onClick={calculateAcceptanceRate}>Check Rate</button>

        {error && <div className='error'>{error}</div>}
        {acceptanceRate !== null && (
          <div className='result'>
            <h2>Your chance of getting in is: {acceptanceRate}%</h2>
            <p>*improve your chances by having more extracurriculars and better grades</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Stats;
