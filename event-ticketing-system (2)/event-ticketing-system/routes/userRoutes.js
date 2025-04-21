const express = require('express');
const router = express.Router();

const {
  getUsers,
  updateProfile,
  getProfile,
  getUserById,
  updateUserRole,
  deleteUser,
  getEventAnalytics, 
} = require('../controllers/userController');

const authenticate = require('../middleware/authenticate');
const { authorizeRole } = require('../middleware/authorization');
<<<<<<< HEAD
<<<<<<< HEAD
=======
const { authenticate, authorize } = require('../middleware/authorization');
// ✅ PUT /api/v1/users/:id → Admin updates role
router.put('/:id', authenticate, authorize('admin'), updateUserRole);
>>>>>>> 3c2bdd4 (Initial project commit)
=======
>>>>>>> e296a4d (Initial commit from Engy)


router.get('/profile', authenticate, getProfile);


router.put('/profile', authenticate, updateProfile);


router.get('/', authenticate, authorizeRole('admin'), getUsers);


router.get('/:id', authenticate, authorizeRole('admin'), getUserById);

router.put('/:id', authenticate, authorizeRole('admin'), updateUserRole);


router.delete('/:id', authenticate, authorizeRole('admin'), deleteUser);


router.get('/events/analytics',authenticate, authorizeRole('organizer'), getEventAnalytics );

module.exports = router;