import React from 'react';
import { useNavigate } from 'react-router-dom';
import './css/creation.css';
import students from './images/Illustration10.png';
import guidance from './images/guidance.png';
import scholarships from './images/scholarships.png';
import applicationTips from './images/application-tips.jpg';
import interviewPrep from './images/interview-prep.png';
import essayAssistance from './images/essay-assistance.jpg';
import ParticlesComponent from './Particles';

const Creation = () => {
  const navigate = useNavigate();  

  const handleJoinNowClick = () => {
    navigate('/dashboard'); 
  };

  return (
    <div className="application">
      
      <header className="header">
        <h1>Pineapple Pathways</h1>
        <p>Your Gateway to University Success</p>
      </header>

      <section className="intro">
        <p className='above'>Pineapples are symbols of abundance and prosperity</p>
        <p className='above' id='low'>A pineapple’s intricate pattern mirrors the complexity of university applications. Pineapple Pathways simplifies scholarships, AIF essays, University costs, and more!</p>
        <img src={students} alt="Students" className="intro-image" />
        <p>
          Pineapple Pathways is your go-to resource for high school students navigating the university application process and seeking scholarships. Our platform offers personalized advice, step-by-step application guidance, scholarship matching, and tips for acing interviews and essays. Whether you're aiming for top universities or seeking financial aid, Pineapple Pathways is here to make your journey smoother, helping you achieve your academic dreams with confidence.
        </p>
      </section>

      <section className="features">
        <h2>Why Choose Pineapple Pathways?</h2>
        <div className="feature">
          <img src={guidance} alt="Personalized Guidance" className="feature-image" />
          <p><strong>Personalized Guidance:</strong> Tailored advice based on your academic goals and interests.</p>
        </div>
        <div className="feature">
          <img src={scholarships} alt="Scholarship Matching" className="feature-image" />
          <p><strong>Scholarship Matching:</strong> Discover scholarships that fit your profile and needs.</p>
        </div>
        <div className="feature">
          <img src={applicationTips} alt="Application Tips" className="feature-image" />
          <p><strong>Application Tips:</strong> Expert advice on how to craft the perfect university application.</p>
        </div>
        <div className="feature">
          <img src={interviewPrep} alt="Interview Prep" className="feature-image" />
          <p><strong>Interview Prep:</strong> Get ready to impress with our comprehensive interview preparation.</p>
        </div>
        <div className="feature">
          <img src={essayAssistance} alt="Essay Assistance" className="feature-image" />
          <p><strong>Essay Assistance:</strong> Craft compelling essays with our writing tips and resources.</p>
        </div>
      </section>

      <section className="cta">
        <h2>Get Started Today!</h2>
        <p>
          Sign up for Pineapple Pathways and take the first step towards securing your future. Whether you're looking for the best universities or the right scholarships, we've got you covered.
        </p>
        <button className="signup-button" onClick={handleJoinNowClick}>Join Now</button>
      </section>
    </div>  
  );
};

export default Creation;
