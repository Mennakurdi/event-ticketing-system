const express = require('express');
const router = express.Router();
const { register, login, forgetPassword } = require('../controllers/authController');

console.log('✅ authRoutes loaded');

// TEST route
router.get('/ping', (req, res) => {
  console.log('✅ /ping route hit');
  res.send('pong');
});

router.post('/register', register);
router.post('/login', login);
router.put('/forgetPassword', forgetPassword);
router.get('/logout', (req, res) => {
  res.clearCookie('token'); // if you use cookies
  res.status(200).json({ message: 'Logged out successfully' });
});

module.exports = router;




