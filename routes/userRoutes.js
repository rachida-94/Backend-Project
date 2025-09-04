const router = require('express').Router();
const { getUser, registerUser, loginUser } = require('../controllers/auth-controller');
const verifyAuthentication = require('../middleware/autth-middleware');

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/me', verifyAuthentication, getUser); 

module.exports = router;
