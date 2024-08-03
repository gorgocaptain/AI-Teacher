import Particles from "react-tsparticles";
import { loadSlim } from "tsparticles-slim";
import { useCallback, useMemo } from "react";
import './ParticlesComponent.css'; // Import the CSS file

const ParticlesComponent = (props) => {
  const options = useMemo(() => {
    return {
      fullScreen: {
        enable: true,
        zIndex: 1, // Set zIndex to ensure particles appear above the background
      },
      interactivity: {
        events: {
          onHover: {
            enable: true,
            mode: "attract", // Use attract mode for acceleration
          },
        },
        modes: {
          attract: {
            distance: 100, // Distance at which particles will start attracting
            duration: 0.4, // Duration of the acceleration effect
            factor: 2, // How much the particles are accelerated
          },
        },
      },
      particles: {
        number: {
          value: 100,
          density: {
            enable: true,
            value_area: 800,
          },
        },
        color: {
          value: "#cc9e9e",
        },
        links: {
          enable: true,
          distance: 100,
          color: "#cc9e9e",
          width: 5,
          opacity: 0.3, 
        },
        move: {
          enable: true,
          speed: { min: 0.25, max: 0.5 },
          direction: "none", 
          outModes: {
            default: "bounce", 
          },
          acceleration: {
            enable: true, 
            speed: { min: 0.5, max: 2 }, 
          },
        },
        opacity: {
          value: { min: 0.1, max: 0.4 },
        },
        size: {
          value: { min: 6, max: 10 },
        },
      },
    };
  }, []);

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
