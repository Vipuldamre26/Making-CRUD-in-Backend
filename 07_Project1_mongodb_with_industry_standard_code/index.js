const express = require('express');
const fs = require('fs');
const mongoose = require('mongoose');


const app = express();
const PORT = 8000;


// we are making CRUD oprations 


// ****************************************************************

// Connection

mongoose.connect('mongodb://127.0.0.1:27017/test-app1')
.then(() => console.log('mongodb connected'))
.catch(err => console.log('mongo error', err));


// *******************************************************************

// Schema

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    jobTitle: {
        type: String,
    },
    gender: {
        type: String,
    }
}, {timestamps: true})


const User = mongoose.model('user', userSchema);
// console.log(User);



// ********************************************************************

// Middleware

app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
    fs.appendFile('log.txt', `\n${Date.now()}: ${req.method}: ${req.path}\n`, (err, data) => {
        next();
    })
})


// ********************************************************************

// Routes 
// making CRUD 


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// this is creation [ C ] of CRUD

app.post('/api/users', async (req, res) => {
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

app.get('/', (req, res) => {
    return res.send('hello from server');
})


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^


// this is creation [ R ] of CRUD

app.get('/users', async (req, res) => {
    const allDbUsers = await User.find({});
    const html = `
    <ul>
    ${allDbUsers.map((user) => `<li>${user.firstName} - ${user.email}</li>`).join('')}
    </ul>
    `;
    res.send(html);
}) 


app.get('/api/users', async (req, res) => {
    const allDbUsers = await User.find({});
    return res.json(allDbUsers);
})


// ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^

// this is creation [ R, U, D ] of CRUD


app.route("/api/users/:id")
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







// when user signup so we get data and add to database, but now we have json only so we added to it 
// app.post("/api/users", (req, res) => {
//     // Create new user
//     const body = req.body;
//     users.push({ id: users.length + 1, ...body });
//     // console.log("Body", body);

//     fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
//         // always pass status code 201 if we create something like user  
//         return res.status(201).json({ status: "Success", id: users.length});
//     })
// })




app.listen(PORT, () => console.log(`Server started at port ${PORT}`))