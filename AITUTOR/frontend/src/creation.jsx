import "./css/creation.css";
import React from 'react';
import ParticlesComponent from "./Particles";

class Creation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: 'B', // Default value
      code: ''
    };
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
    // Handle form submission logic here (e.g., send data to a server)
  };

  render() {
    return (
      <div className="application">
        <div className="center">
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
