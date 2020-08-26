const mysql = require('mysql')

const conn = mysql.createConnection({
  host: 'localhost',
  user: 'Eric',
  password: 'dEr8wDHJMg',
  database: 'Projet_7',
  port: '330'
})

conn.connect(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack)
    return
  }
  console.log('connected as id ' + conn.threadId)
})

module.exports = conn