import "./css/creation.css";
import React from 'react';
import ParticlesComponent from "./Particles";
import illustration1 from './images/Illustration11.png';
import illustration2 from './images/Illustration10.png';

class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: 'B',
      code: '',
      currentImage: illustration1,
      imageClass: ''
    };
  }

  componentDidMount() {
    this.imageInterval = setInterval(() => {
      this.setState(prevState => ({
        imageClass: 'hidden',
      }), () => {
        setTimeout(() => {
          this.setState(prevState => ({
            currentImage: prevState.currentImage === illustration1 ? illustration2 : illustration1,
            imageClass: ''
          }));
        }, 500); // Matches the CSS transition duration
      });
    }, 5000); // Change image every 3 seconds
  }

  componentWillUnmount() {
    clearInterval(this.imageInterval);
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { course, code } = this.state;
    console.log(`Course: ${course}, Code: ${code}`);
  };

  render() {
    return (
      <div className="application">
        <div className="center">
          <img src={this.state.currentImage} alt="Illustration" className={this.state.imageClass} />
          <h1>AI Teacher</h1>
          <p>The perfect assistant for learning EXACTLY what you need</p>
          <form onSubmit={this.handleSubmit}>
            <select
              name="course"
              id="course"
              value={this.state.course}
              onChange={this.handleChange}
            >
              <option value="B">Biology</option>
              <option value="C">Chemistry</option>
              <option value="P">Physics</option>
              <option value="M">Math</option>
              <option value="E">English</option>
            </select>
            <input
              type="text"
              id="code"
              name="code"
              maxLength={6}
              style={{ textTransform: 'uppercase' }}
              placeholder="Course Code: "
              value={this.state.code}
              onChange={this.handleChange}
            />
            <button type="submit">Submit</button>
          </form>
        </div>
        
        <div className="particles-wrapper">
          <ParticlesComponent />
        </div>
      </div>
    );
  }
}

export default Creation;
