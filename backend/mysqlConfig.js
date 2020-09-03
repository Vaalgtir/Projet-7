const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'mysql-development',
  user: 'root',
  password: 'khunou',
  database: 'projet_7',
  port: '3306',
  timezone: 'Europe/London',
  insecureAuth : true
})

conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + conn.threadId)
})

module.exports = conn