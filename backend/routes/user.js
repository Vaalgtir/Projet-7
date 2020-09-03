const express = require('express');

const router = express.Router();

const userCtl = require('../controlers/user');
const auth = require('../middleware/auth');

router.post('/create', userCtl.createUser);
router.post('/login', userCtl.login);
router.get('/all', auth, userCtl.showAll);
router.get('/:id', auth, userCtl.showOne);
router.put('/update/:id', auth, userCtl.updateUser);
router.delete('/delete/:id', auth, userCtl.deleteUser);

module.exports = router;