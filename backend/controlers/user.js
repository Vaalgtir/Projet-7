const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const conn = require('../mysqlConfig')

const Error = require('../security_public/error');

exports.createUser = (req, res, next) => {
    const user = req.body
    bcrypt.hash(user.password, 10)
      .then((hash) => {
        user.password = hash
        conn.query('INSERT INTO users SET ?', user, function (
          error,
          results,
          fields
        ) {
          if (error) {
            return Error.errorManagement(res, 400, error.sqlMessage)
          } 
          return res.status(201).json({
            message:
              ' Utilisateur créé'
          })
        })
      })
}

exports.login = (req, res, next) => {
    const userReq = req.body.username
    const passReq = req.body.password
    if (userReq && passReq) {
      conn.query(
        'SELECT * FROM projet_7.users WHERE username= ?',
        userReq,
        function (_error, results, _fields) {
          if (results.length > 0) {
            bcrypt.compare(passReq, results[0].password).then((valid) => {
                if (!valid) {
                  Error.errorManagement(res, 401, { message: 'Utilisateur ou mot de passe inconnu' })
                } else {
                  console.log(userReq, "s'est connecté")
                  let privilege = ''
                  if (results[0].isAdmin === 1) {
                    privilege = 'admin'
                  } else {
                    privilege = 'member'
                  }
                  res.status(200).json({
                    userId: results[0].userID,
                    username: results[0].username,
                    email: results[0].email,
                    privilege: privilege,
                    accessToken: jwt.sign(
                      { userId: results[0].userID, role: privilege, username: results[0].username, isAuthentified: true },
                      'LTWNHGKXTJSSRMPGDEWVUUXGP',
                      { expiresIn: '24h' }
                    )
                  })
                }
              })
          } else {
            Error.errorManagement(res, 401, { message: 'Utilisateur ou mot de passe inconnu' })
          }
        }
      )
    } else {
      Error.errorManagement(res, 500, { message: "Entrez un nom d'utilisateur et un mot de passe" })
    }
}

exports.showOne = (req, res, next) => {
  conn.query(
    'SELECT * FROM users WHERE userID=?',
    req.params.id,
    function (error, results, fields) {
      if (error) {
        return Error.errorManagement(res, 400, error)
      }
      return res.status(200).json({ results })
    }
  )
}

exports.showAll = (req, res, next) => {
  conn.query(
    "SELECT * from users",
    function (error, results, fields) {
      if (error) {
        return Error.errorManagement(res, 400, error)
      }
      return res.status(200).json({ results })
    }
  )
}

exports.deleteUser = (req, res, next) => {
  conn.query(
    'DELETE FROM users WHERE userID=?',
    req.params.id,
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res
        .status(200)
        .json({ message: 'Votre compte a bien été supprimé !' })
    }
  )
}
exports.updateUser = (req, res, next) => {
  const updateArticle = req.body
  conn.query(
    'UPDATE users SET ? WHERE userID=?',
    [updateArticle, req.params.id],
    function (error, results, fields) {
      if (error) {
        return res.status(400).json(error)
      }
      return res
        .status(200)
        .json({ message: 'Votre message a bien été modifié !' })
    }
  )
}