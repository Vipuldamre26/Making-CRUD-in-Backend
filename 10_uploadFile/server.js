const express = require('express');
const path = require('path');
const { dbConnection } = require('./connect');
const multer = require('multer');

const PORT = 8008;
const app = express();




// database connections 

dbConnection('mongodb://127.0.0.1:27017/file-upload')
.then(() => console.log('MongoDB connected'))



// set the view engine to ejs

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// Middlewares 


const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {                     //file = chosen from user
        return cb(null, './uploads');                            // cb = call back
    },
    filename: function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    },
 })  

 const upload = multer({ storage: storage })

app.use(express.json());
app.use(express.urlencoded({ extended: false }))


// Routes 

app.get('/', (req, res) => {
    return res.render('homepage');
});

app.post('/upload', upload.single('profileImage'), (req, res) => {
    console.log(req.body);
    console.log(req.file);
    
    return res.redirect('/')
})



app.listen(PORT, () => console.log(`Server started at port: ${PORT}`))