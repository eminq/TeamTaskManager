module.exports = {
    db: {
    user: 'tasks',
    password: 'tasks1',
    database: 'TeamTaskManager',
    server: 'DESKTOP-6VIVVC0',
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    },
    options: {
      trustServerCertificate: true, 
      trustedConnection: false,
      enableArithAbort: true
    },
    port: 1433},
    auth: {
      jwtSecret: 'secret'
    }
}
