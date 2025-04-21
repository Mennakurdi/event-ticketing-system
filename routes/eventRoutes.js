const express = require('express');
const router = express.Router();

const eventController = require('../controllers/eventController'); 
const {
  createEvent,
  getAllEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  updateEventStatus
} = eventController;

const authenticate = require('../middleware/authenticate');
const { isOrganizer, isAdmin, authorizeRole } = require('../middleware/authorization');





router.post('/', authenticate, isOrganizer, eventController.createEvent);
router.get('/', eventController.getAllEvents);


router.get('/list', eventController.getAllEvents);


router.get('/:id', eventController.getEventById);


router.post('/create', authenticate, isOrganizer, eventController.createEvent);
router.put('/:id', authenticate, authorizeRole('organizer', 'admin'), updateEvent);


router.put('/:id/edit', authenticate, isOrganizer, eventController.updateEvent);




router.put('/:id/approve', authenticate, isAdmin, eventController.updateEventStatus);

router.delete('/:id', authenticate, isOrganizer, eventController.deleteEvent);


 

// (Optional) Only organizers can view analytics
// router.get('/analytics', authenticate, isOrganizer, eventController.getAnalytics);

module.exports = router;

