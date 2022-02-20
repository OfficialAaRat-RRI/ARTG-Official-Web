const express = require('express');
const app = express();
const port = 3000;

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

var userProfile;

const passport = require('passport');
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine' , 'ejs');

app.get('/success' , (req , res) => res.send(userProfile));
app.get('/error' , (req , res) => res.send('Error while Logging in.'));

passport.serializeUser(function(user, cb) {
    cb(null, user);
})

passport.deserializeUser(function(obj, cb) {
    cb(null, obj);
})

app.set('view engine' , 'ejs')

app.use(express.static('public'));
app.use('/css', express.static(__dirname + '/public/css'));

app.set('pages', path.join(__dirname, './pages'));
app.set('login' , './pages/login/signin-signup.ejs');

app.set('view engine' , 'ejs');

// Pages
app.set('./pages')
app.set('login' , './pages/login.ejs');

app.get('/' , (req , res) => {
    // res.send("This is the home page // Under Construction");
    console.log("Someone has visited the home page");

    fs.readFile('./pages/home-page/index.ejs' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.get('/login' , (req , res) => {
    fs.readFile('./pages/login/signin-signup.ejs' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
})