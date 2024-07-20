const express = require('express');
const users = require('./MOCK_DATA.json');

const app = express();
const PORT = 8000;


// Routes 

app.get('/', (req, res) => {
    return res.send('hello from server');
})


// for web app we send html which is SSR(Server Side Rendering)
app.get('/users', (req, res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    res.send(html);
}) 


// for mobile app we send json 
app.get('/api/users', (req, res) => {
    console.log(req);
    return res.json(users);
})

app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);
    const user = users.find((item) => {
        return id === item.id
    })

    return res.json(user);
})



app.listen(PORT, () => console.log(`Server started at port ${PORT}`))