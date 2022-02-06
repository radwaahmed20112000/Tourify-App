const express = require('express');
const notificationController = require('../Controllers/NotificationController')
const router = express.Router();

router.get('/', notificationController.getNotifications);
router.put('/view/:id', notificationController.viewNotification)