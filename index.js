// implement your API here
const express = require('express');
const db = require('./data/db.js');

const server = express();
server.use(express.json());

server.get('/', (req,res) => {
    res.json({hello: 'API is working'})
});


// Add new user
server.post('/api/users', (req,res) => {
    const userInfo = req.body;
    if(!userInfo.name || !userInfo.bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."})
    } else {
        db.insert(userInfo).then(user => {
            res.status(201).json(user)
        }).catch(err => {
            console.log(err)
            res.status(500).json({errorMessage:"There was an error while saving the user to the database"})
        })
    }
})

// List Users
server.get('/api/users', (req,res) => {
    db.find()
        .then(users => {
            res.status(201).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage:"The users information could not be retrieved."})
        })
})
const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));