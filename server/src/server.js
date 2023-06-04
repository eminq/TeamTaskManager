const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../dbFiles/operations');
const session = require('express-session');

const User = require('../dbFiles/user');
const Task = require('../dbFiles/task');
const config = require('../config');

const app = express();

function jwtSignUser(user){
    const  WEEK = 60*60*24*7;
    return jwt.sign(user, config.auth.jwtSecret, {
        expiresIn: WEEK
    }) 
}

const sessionConfig = {
    secret: 'thisismytopsecret',
    resave: false,
    saveUninitialized: true,
    cookie: { 
        httpOnly: true,
        expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
        maxAge: 1000 * 60 * 60 * 24 * 7
    }
}

app.use(session(sessionConfig));

app.use(bodyParser.json());
app.use(cors());


app.get('/', (req,res) => {
    res.send('Hello');
    console.log(bcrypt.hashSync('admin123', 10));
})

/// ALL TASKS ///
app.get('/api/tasks', async (req,res) => {
    const tasks = await db.getTasks();
    res.status(200).json(tasks);
}) 

/// GET ONE TASK ///
app.get('/api/tasks/:id', async(req,res) => {
    const { id } = req.params;
    const result = await db.findTask(id);
    const task = result[0];
    console.log(task);
    res.json(task);
})

/// ALL USERS ///
app.get('/api/users', async (req,res) => {
    const users = await db.getUsers();
    res.status(200).json(users);
})

/// ADD TASK ///
app.post('/api/tasks', async (req,res) => {
    const { text, priority, status, userId } = req.body;
    const newTask = new Task(text, status, priority, userId);
    const result = await db.addTask(newTask);
    const task = result[0];
    console.log(task);
    res.send(task);
})

/// EDIT TASK ///
app.patch('/api/tasks/:id', async (req,res) => {
    const { id } = req.params;
    const { text, priority, status } = req.body;
    console.log(id, text, priority, status);
    const task = await db.editTask(id, text, priority, status);
    console.log(task);
    res.send(task);  
})

/// DELETE TASK ///
app.delete('/api/tasks/:id', async (req,res) => {
    const { id } = req.params;
    const result = await db.deleteTask(id);
    console.log(result);
    res.send(result); 
})

/// LOGIN - USER ///
app.post('/api/login/user', async (req,res) => {
    const { email, password } = req.body;
    const users = await db.getUsers();
    for(let user of users){
        if(user.email === email && user.isAdmin === false){
            const hash = await bcrypt.compare(password, user.hash);
            //console.log(hash);
            if(hash){
                console.log('logged in as user');
                return res.json({
                    response: true,
                    user: user,
                    token: jwtSignUser(user)
                });
            }else{
                console.log('incorrect credentials');
                return res.json({
                    response: false,
                    message: 'Incorrect credentials!'
                });
            }
        }
    }
    return res.json({
        response: false,
        message: 'Incorrect credentials!'
    });
});

/// LOGIN - ADMIN ///
app.post('/api/login/admin', async (req,res) => {
    const { email, password } = req.body;
    const users = await db.getUsers();
    for(let user of users){
        if(user.email === email && user.isAdmin === true){
            const hash = await bcrypt.compare(password, user.hash);
            //console.log(hash);
            if(hash){
                console.log('logged in as admin');
                return res.json({
                    response: true,
                    user: user,
                    token: jwtSignUser(user)
                });
            }else{
                console.log('incorrect credentials');
                return res.json({
                    response: false,
                    message: 'Incorrect credentials!'
                });
            }
        }
    }
    return res.json({
        response: false,
        message: 'Incorrect credentials!'
    });
});


/// REGISTER USER ///
app.post('/api/register', async(req,res) => {
    try{
        const { isAdmin, firstName, lastName, email, password, image } = req.body;
        const hash = bcrypt.hashSync(password, 10);
        const newUser = new User(isAdmin, firstName, lastName, email, hash, image);
        const result = await db.addUser(newUser);
        const user = result[0];
        //console.log(user);
        if(result){
            console.log('added');
            return res.json({
                response: true,
                user: user,
                token: jwtSignUser(user)
            });
        }else{
            console.log('error');
            return res.json({
                response: false,
                message: 'Error!'
            });
        }
    }catch(err){
        console.log('error');
        return res.json({
            response: false,
            message: 'Error!'
        });
    }
    
})


app.listen(3000, (req,res) => {
    console.log('Listening on port 3000..');
})
