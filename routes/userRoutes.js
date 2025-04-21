const express = require('express');
const router = express.Router();

const {
  getUsers,
  updateProfile,
  getProfile,
  getUserById,
  updateUserRole,
  deleteUser,

  getEventAnalytics, // Analytics function imported from the contro
} = require('../controllers/userController');

const authenticate = require('../middleware/authenticate');
const { authorizeRole } = require('../middleware/authorization');



router.get('/profile', authenticate, getProfile);


router.put('/profile', authenticate, updateProfile);


router.get('/', authenticate, authorizeRole('admin'), getUsers);


router.get('/:id', authenticate, authorizeRole('admin'), getUserById);

router.put('/:id', authenticate, authorizeRole('admin'), updateUserRole);


router.delete('/:id', authenticate, authorizeRole('admin'), deleteUser);



router.get('/events/analytics',authenticate, authorizeRole('organizer'), getEventAnalytics );

module.exports = router;
