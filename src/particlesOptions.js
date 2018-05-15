const particlesOptions = { 
  particles: {
    number: {
      value: 90,
      density: {
        enable: true,
        value_area: 789.1600969088593
      }
    },
    color: {
      value: "#303E73"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#303E73"
      },
      polygon: {
        nb_sides: 7
      }
    },
    opacity: {
      value: 0,
      random: true,
      anim: {
        enable: false,
        speed: 0.5,
        opacity_min: 0.1,
        sync: false
      }
    },
    size: {
      value: 0,
      random: true,
      anim: {
        enable: true,
        speed: 78.54729729729723,
        size_min: 0,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 150.02125301084325,
      color: "#303E73",
      opacity: 0.9,
      width: 1.3335222489852736
    },
    "move": {
      "enable": true,
      "speed": 6,
      "direction": "none",
      "random": true,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
    }
  },
  "retina_detect": true
}

export {particlesOptions};