const express = require('express');
const User = require('../models/user')
const router = express.Router();


router.post('/', async (req, res) => {
    const body = req.body;
    if(
        !body ||
        !body.first_name ||
        !body.last_name ||
        !body.email ||
        !body.gender ||
        !body.job_title
    ){
        return res.status(400).json({ msg: "All fields are required"})
    }

    const result = await User.create({
        firstName: body.first_name,
        lastName: body.last_name,
        email: body.email,
        gender: body.gender,
        jobTitle: body.job_title
    })

    // console.log('result', result);

    return res.json({ msg: 'success' })

})



// router.get('/', async (req, res) => {
//     const allDbUsers = await User.find({});
//     const html = `
//     <ul>
//     ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
//     </ul>
//     `;
//     res.send(html);
// }) 


router.get('/', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})




router.route("/:id")
.get( async(req, res) => {
    const user = await User.findById(req.params.id);
    return res.json(user);
})
.patch( async (req, res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: 'Updated' });
    return res.json({ status: "success" })
})
.delete( async (req, res) => {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" })
})


module.exports = router;