const jwt = require('jsonwebtoken');

const conn = require('../mysqlConfig')

const Error = require('../security_public/error');

exports.createArticle = (req, res, next) => {
    const message = req.body
    console.group(req)
    conn.query('INSERT INTO articles SET ?', message, function (
      error,
      results,
      fields
    ) {
      if (error) {
        return Error.errorManagement(res, 400, error)
      }
      return res.status(201).json({ message: 'Votre message a bien été posté !' })
    })
}

exports.showAll = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1]
    const decodedToken = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
    const userId = decodedToken.userId
    conn.query(
      "SELECT * from articles",
      [userId],
      function (error, results, fields) {
        if (error) {
          return Error.errorManagement(res, 400, error)
        }
        return res.status(200).json({ results })
      }
    )
}
 
exports.deleteArticle = (req, res, next) => {
    conn.query(
      'SELECT * FROM articles WHERE articleID=?',
      req.params.id,
      function (error, results, fields) {
        if (error) {
          return res.status(400).json(error)
        }
        const token = req.headers.authorization.split(' ')[1]
        const decodedToken = jwt.verify(token, 'LTWNHGKXTJSSRMPGDEWVUUXGP')
        const userId = decodedToken.userId
        const role = decodedToken.role
        const messageId = results[0].userID
        if (userId !== messageId && role !== 'admin') {
          return Error.errorManagement(res, 401, { message: 'Accès non autorisé' })
        }
        conn.query(
          `DELETE FROM articles WHERE articleID=${req.params.id}`,
          req.params.id,
          function (error, results, fields) {
            if (error) {
              return Error.errorManagement(res, 400, error)
            }
            return res
              .status(200)
              .json({ message: 'Votre message a bien été supprimé !' })
          }
        )
      }
    )
}

// exports.likeDislike = (req, res, next) => {
//     const userId = req.body.userId;
//     const like = req.body.like;

//     Sauce.findOne({ _id: req.params.id })
//         .then(sauce => {
//             if (like == -1) {
//                 if (!sauce.usersDisliked.includes(userId)) {
//                     // => l'ajouter à la bonne tab
//                     Sauce.updateOne({ _id: req.params.id }, { $push: { usersDisliked: userId }, $inc: { dislikes: 1 } })
//                         .then(() => res.status(200).json({ message: 'user ajouté a usersDisliked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 } else {
//                     // => renvoi "produit deja liké/disliké"
//                     return (res.status(400).json({ message: 'produit deja liké/disliké' }));
//                 }
//                 if (sauce.usersLiked.includes(userId)) {
//                     // => suppr du tab userLiked
//                     Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
//                         .then(() => res.status(200).json({ message: 'user supprimé de usersLiked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 }

//             } else if (like == 0) {
//                 // => l'enlever du tab correspondant
//                 if (sauce.usersLiked.includes(userId)) {
//                     // => suppr du tab userLiked
//                     Sauce.updateOne({ _id: req.params.id }, { $pull: { usersLiked: userId }, $inc: { likes: -1 } })
//                         .then(() => res.status(200).json({ message: 'user supprimé de usersLiked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 }
//                 if (sauce.usersDisliked.includes(userId)) {
//                     // => suppr du tab userDisliked
//                     Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
//                         .then(() => res.status(200).json({ message: 'user supprimé de usersDisliked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 }

//             } else if (like == 1) {
//                 if (!sauce.usersLiked.includes(userId)) {
//                     // => l'ajouter à la bonne tab
//                     Sauce.updateOne({ _id: req.params.id }, { $push: { usersLiked: userId }, $inc: { likes: 1 } })
//                         .then(() => res.status(200).json({ message: 'user ajouté a usersLiked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 } else {
//                     // => renvoi "produit deja liké/disliké"
//                     return res.status(400).json({ message: 'produit deja liké/disliké' });
//                 }
//                 if (sauce.usersDisliked.includes(userId)) {
//                     // => suppr du tab userDisliked
//                     Sauce.updateOne({ _id: req.params.id }, { $pull: { usersDisliked: userId }, $inc: { dislikes: -1 } })
//                         .then(() => res.status(200).json({ message: 'user supprimé de usersDisliked' }))
//                         .catch(error => Error.errorManagement(res, 500, error));
//                 }
//             }
//         })
//         .catch(error => Error.errorManagement(res, 404, error));
// }