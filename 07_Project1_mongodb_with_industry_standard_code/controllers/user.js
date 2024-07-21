const User = require('../models/user')

async function handleGetAllUsers(req, res){
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
}


const handleGetUserById = async (req, res) => {
    const user = await User.findById(req.params.id);
    if( !user ) return res.status(404).json({ error: "user not found" });
    return res.json(user);
}


const handleUpdateUserById = async (req, res) => {
    //Edit user with id
    await User.findByIdAndUpdate(req.params.id, { lastName: 'Updated' });
    return res.json({ status: "success" })
}


const handleDeleteUserById = async (req, res) => {
    //Delete user with id
    await User.findByIdAndDelete(req.params.id)
    return res.json({ status: "success" })
}


const handleCreateNewUser = async (req, res) => {
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

    return res.json({ msg: 'success', id: result._id })

}


module.exports = {
    handleGetAllUsers,
    handleGetUserById,
    handleUpdateUserById,
    handleDeleteUserById,
    handleCreateNewUser,
}