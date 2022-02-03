const express = require('express');
const app =express();
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controller/register');
const signin = require('./controller/signin');
const profile = require('./controller/profile');
const image = require('./controller/image');


const db= knex({
    client: 'pg',
    connection: {
      host : 'postgresql-solid-42933', //localhost
      user : 'postgres',//add your user name for the database here
      password : '99468799', //add your correct password in here
      database : 'smart-brain' //add your database name you created here
    }
});


app.use(express.json());
app.use(cors());


const database = {
    users: [
        {
            id: '123',
            name: 'john',
            email: 'john@gmail.com',
            password: 'cookies',
            entries: 0,
            joined: new Date()
        },
        {
            id: '124',
            name: 'sally',
            email: 'sally@gmail.com',
            password: 'bananas',
            entries: 0,
            joined: new Date()
        }
    ]
    
}

app.get('/',(req, res) => {
    res.send('working') 
})

app.post('/signin', signin.handleSignin(bcrypt, db))

app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })


app.post('/profile/:id', (req, res) => { profile.handleProfile(req, res, db) })


app.put('/image', image.handleImage( db) )
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })




app.listen(process.env.PORT || 3000, () => {
    console.log(`app is running on port ${process.env.PORT}`);
})
