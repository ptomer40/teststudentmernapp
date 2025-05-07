const express = require('express');
const router = express.Router();

const verifyToken = require('../middleware/authMiddleware')
const authorizeRoles = require('../middleware/roleMiddleware');

router.post('/markAttendance',verifyToken,authorizeRoles('teacher', 'admin'),(req, res) => {
    console.log("Hi inside /markAttendance");
    res.json({ msg: `Attendance marked by ${req.user.role}` });
  }
);

module.exports = router;
