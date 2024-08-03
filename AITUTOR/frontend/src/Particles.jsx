import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";
import './ParticlesComponent.css'; // Import the CSS file

const ParticlesComponent = (props) => {
    const options = useMemo(() => ({
        background: {
          color: {
            value: "#000000",
            
          },
          opacity: 0
          
        },
        particles: {
          number: {
            value: 50,
          },
          color: {
            value: "#D3D3D3",
          },
          
          size: {
            value: 5,
          },
          move: {
            enable: true,
            speed: 1,
          },
          
        },
        interactivity: {
          events: {
            onHover: {
              enable: true,
              mode: "repulse",
            },
          },
          modes: {
            repulse: {
              distance: 100,
            },
          },
        },
      }), []);
      

  const particlesInit = useCallback((engine) => {
    loadSlim(engine);
  }, []);

  return (
    <div className="particles-wrapper">
      <Particles id={props.id} init={particlesInit} options={options} />
    </div>
  );
};

export default ParticlesComponent;
