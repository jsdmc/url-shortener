export default {
  development: {
    isProduction: false,
    API_URL: 'http://localhost:9990'
  },
  production: {
    isProduction: true,
    API_URL: 'http://localhost:9990'
  }
}[process.env.NODE_ENV || 'development'];
