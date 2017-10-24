class Config {
  static getDbUrl() {
    console.log(process.env);
    if (process.env['NODE_ENV'] !== 'development') {
      console.log('prod');
      return 'https://liars-dice-server.herokuapp.com';
    }
    else {
      console.log('dev');      
      return 'http://localhost:3001'
    }
  }
}

export default Config;