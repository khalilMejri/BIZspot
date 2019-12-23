(function (window) {
    window.__env = window.__env || {};

    // API url
    // window.__env.apiUrl = 'http://localhost:13500/api';
    window.__env.apiUrl = 'https://biz-spot.herokuapp.com/api';
    // window.__env.baseUrl = 'http://192.168.0.57:13500/api';
    // window.__env.apiUrl = 'https://4bacb7e4.ngrok.io/api';
    // Logger url
    // window.__env.loggerUrl = 'http://localhost:13600/logger';
    // window.__env.loggerUrl = 'http://192.168.0.57:13600/logger';
    // window.__env.loggerUrl = 'https://clever-lionfish-63.localtunnel.me/logger';

    // Whether or not to enable debug mode
    // Setting this to false will disable console output
    window.__env.enableDebug = true;

    window.__env.NODE_ENV = 'development';

}(this));