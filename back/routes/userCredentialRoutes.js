const express = require('express');
const { updateUserPassword, updateUserProfile, getAllUsers, getUserById,updateUserByAdmin,deleteUser } = require('../controllers/userCredentialController');
const { protect ,admin } = require('../middleware/authMiddleware');
const router = express.Router();
// const { assignRole } = require('../controllers/userRoleController');
router.put('/updatePassword',protect,updateUserPassword)
router.put('/updateProfile',protect,updateUserProfile)
router.get('/', protect, admin, getAllUsers)
router.get('/:id', protect, admin, getUserById)
router.put('/:id', protect, admin, updateUserByAdmin)
router.delete('/:id', protect, admin, deleteUser)
// router.put('/assign-role', protect, admin, assignRole);

module.exports=router;


