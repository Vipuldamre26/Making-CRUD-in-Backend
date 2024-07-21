const express = require('express');
const User = require('../models/user')
const router = express.Router();

const { handleGetAllUsers, handleGetUserById, handleUpdateUserById, handleDeleteUserById, handleCreateNewUser } = require('../controllers/user');


// Create user
router.route
.get('/', handleGetAllUsers)
.post('/', handleCreateNewUser)



// router.get('/', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// }) 






router.route("/:id")
.get(handleGetUserById)
.patch(handleUpdateUserById)
.delete(handleDeleteUserById)


module.exports = router;