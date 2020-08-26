const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const articleCTL = require('../controlers/article')

router.post('/', auth, articleCTL.createArticle);
router.get('/', auth, articleCTL.showAll);
router.delete('/:id', auth, articleCTL.deleteArticle)
// router.delete('/:id', auth, sauceCtl.deleteArticle);
// router.post('/:id/like', auth, sauceCtl.likeDislike);

module.exports = router;