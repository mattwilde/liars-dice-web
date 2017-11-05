class Config {
  static getDbUrl() {
    if (process.env['NODE_ENV'] !== 'development') { // prod
      return 'https://liars-dice-server.herokuapp.com';
    }
    else { // dev
      return 'http://localhost:3001'
    }
  }

  static isTestDisplay = false;
}

export default Config;