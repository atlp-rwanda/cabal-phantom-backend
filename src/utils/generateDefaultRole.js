exports.generateDefault = () => {
     let role = "normal"
     return role
}

exports.classifyBus = val => {
     if (val >= 18 && val < 30) {
          return "small"
     } else if (val >= 30 && val < 60) {
          return "medium"
     } else if (val >= 60) {
          return "large"
     }
}
