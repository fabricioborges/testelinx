module.exports = {
    apps : [{
      name        : "worker",
      script      : "./worker.js",
      watch       : true,
      name       : "api-app",
      script     : "src/server.js",
      instances  : 4,
      exec_mode  : "cluster"
    }]
  }
  