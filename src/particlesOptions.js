const particlesOptions = { 
  particles: {
    number: {
      value: 250,
      density: {
        enable: true,
        value_area: 789.1600969088593
      }
    },
    color: {
      value: "#0D95FE"
    },
    shape: {
      type: "circle",
      stroke: {
        width: 0,
        color: "#0D95FE"
      },
      polygon: {
        nb_sides: 7
      }
    },
    opacity: {
      value: 0,
      random: false,
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
      distance: 100,
      color: "#0D95FE",
      opacity: 1,
      width: 1.3335222489852736
    },
    "move": {
      "enable": true,
      "speed": 3,
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