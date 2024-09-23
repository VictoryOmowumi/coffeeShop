const express = require('express');
const { registerUser, loginUser, getUsers, resetPassword, getUserById, forgotPassword, updateUserProfile } = require('../controllers/userController');
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/reset-password', resetPassword);
router.post('/forgot-password', forgotPassword);
router.get('/:id', getUserById);
router.put('/update', updateUserProfile);
router.get('/', getUsers);


module.exports = router;
