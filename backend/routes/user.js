const express = require('express');

const router = express.Router();

const userCtl = require('../controlers/user');

router.post('/create', userCtl.createUser);
router.post('/login', userCtl.login);

module.exports = router;