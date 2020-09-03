const express = require('express');

const router = express.Router();

const auth = require('../middleware/auth');
const articleCTL = require('../controlers/article')

router.post('/', auth, articleCTL.createArticle);
router.get('/', auth, articleCTL.showAll);
router.delete('/:id', auth, articleCTL.deleteArticle)

module.exports = router;