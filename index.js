// implement your API here
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors')

const server = express();
server.use(express.json());
server.use(cors());

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
            res.status(200).json(users)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({errorMessage:"The users information could not be retrieved."})
        })
})

// List User
server.get('/api/users/:id', (req,res) => {
    const {id} = req.params;

    db.findById(id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            res.status(500).json({errorMessage: "The user information could not be retrieved."})
        })
})
// Delete a user
server.delete('/api/users/:id', (req,res) => {
    const {id} = req.params;
    db.remove(id)
        .then(user => {
            if(!user) {
                res.status(404).json({message: "The user with the specified ID does not exist."})
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({ errorMessage: "The user could not be removed" })
        })
})
// Update a user
server.put('/api/users/:id', (req,res) => {
    const {id} = req.params;
    const userInfo = req.body;
    if (!userInfo.name || !userInfo.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        db.update(id, userInfo)
        .then(user => {
            if(!user){
                res.status(404).json({ message: "The user with the specified ID does not exist." })
            } else {
                res.status(200).json(user)
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ errorMessage: "The user information could not be modified." })
        })
    }

})
const port = 5000;
server.listen(port, () => console.log(`\n** API on port ${port} \n`));