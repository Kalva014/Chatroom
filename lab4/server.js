// import dependencies
const express = require('express');
const cookieParser = require('cookie-parser');
const hbs = require('express-handlebars');
const path = require('path');

// Newly added dependencies
const roomIdGenerator = require('./util/roomIdGenerator.js');
const mongoose = require('mongoose'); // For mongodb
const config = require('config'); // To access the config file
const Room = require('./models/Rooms');
const Message = require('./models/Messages')

// import handlers
const homeHandler = require('./controllers/home.js');
const roomHandler = require('./controllers/room.js');

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// If you choose not to use handlebars as template engine, you can safely delete the following part and use your own way to render content
// view engine setup
app.engine('hbs', hbs({extname: 'hbs', defaultLayout: 'layout', layoutsDir: __dirname + '/views/layouts/'}));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const db = config.get('mongoURI');
mongoose.connect(db, err => {
    if(err) {
        throw err;     
    }
    else {
        console.log("Connected to MongoDB!")
    }
});

// set up stylesheets route

// TODO: Add server side code

// Create endpoint - to create a new room in database
app.post('/create', function(req, res) {
    const newRoom = new Room({
        name: req.body.roomName,
        id: roomIdGenerator.roomIdGenerator()
    });

    newRoom.save().then(console.log("Room has been added"))
        .catch(err => console.log("Error when creating room: ", err))
});

app.post('/:roomName/createMessage', function(req, res) {
    const newMessage = new Message({
        nickname: req.body.nickname,
        message: req.body.message,
        roomName: req.body.roomName
    });

    newMessage.save().then(console.log("Message has been added"))
        .catch(err => console.log("Error when creating message: ", err))
});

// getRoom - return JSON of all rooms in the database
app.get('/getRoom', function(req, res) {
    Room.find().lean().then(item => {
        res.json(item)
    });
});

app.get('/:roomName/messages', function(req, res) {
    Message.find({ roomName: req.params.roomName }).lean().then(item => {
        res.json(item)
    });
});

// Create controller handlers to handle requests at each endpoint
app.get('/', homeHandler.getHome);
app.get('/:roomName', roomHandler.getRoom); // Captures anything after the slash as a room name which is bad behavior

// NOTE: This is the sample server.js code we provided, feel free to change the structures

app.listen(port, () => console.log(`Server listening on http://localhost:${port}`));