<<<<<<< HEAD
const express = require('express');
const router = express.Router();

<<<<<<< HEAD
const eventController = require('../controllers/eventController'); // this line was missing
=======
const eventController = require('../controllers/eventController'); 
>>>>>>> 4beb8a1 (Commit only specific files or folders)
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

<<<<<<< HEAD
// Anyone can view all events
router.get('/list', eventController.getAllEvents);

// Anyone can view one event
router.get('/:id', eventController.getEventById);

// Only organizers can create an event
router.post('/create', authenticate, isOrganizer, eventController.createEvent);
router.put('/:id', authenticate, authorizeRole('organizer', 'admin'), updateEvent);

// Only organizers can update their own event
=======

router.get('/list', eventController.getAllEvents);


router.get('/:id', eventController.getEventById);


router.post('/create', authenticate, isOrganizer, eventController.createEvent);
router.put('/:id', authenticate, authorizeRole('organizer', 'admin'), updateEvent);


>>>>>>> 4beb8a1 (Commit only specific files or folders)
router.put('/:id/edit', authenticate, isOrganizer, eventController.updateEvent);



<<<<<<< HEAD
// Only admins can approve or reject events
=======

>>>>>>> 4beb8a1 (Commit only specific files or folders)
router.put('/:id/approve', authenticate, isAdmin, eventController.updateEventStatus);

router.delete('/:id', authenticate, isOrganizer, eventController.deleteEvent);


 

// (Optional) Only organizers can view analytics
// router.get('/analytics', authenticate, isOrganizer, eventController.getAnalytics);

module.exports = router;
=======
>>>>>>> 9a312d1 (Update eventRoutes.js)

