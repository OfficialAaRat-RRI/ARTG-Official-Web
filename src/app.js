const config = require('./config.json');

const express = require('express');
const port = 3000;
const passport = require('passport');

const ejs = require('ejs');
const path = require('path');
const fs = require('fs');

var userProfile;

require('./auth');
const session = require('express-session');
console.log(config);

// Google Log in Procress
function isloggedIn(req , res , next){
    req.user ? next() : res.sendStatus(401);
}

function sessiondestroy(req , res){
    successRedirect = '/logout';
}

// Passport / Express

const app = express();
app.use(session({ secret: "cats" }))
app.use(passport.initialize());
app.use(passport.session());

// Google / EJS

app.set('view engine' , 'ejs');

// Google Login

app.get('/success' , (req , res) => res.send(userProfile));
app.get('/error' , (req , res) => res.send('Error while Logging in.'));

// EJS

app.set('view engine' , 'ejs')

// Static Files

app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'src/public/css'));

// Pages Files

app.set('pages', path.join(__dirname, './pages'));
app.set('login' , 'src/pages/login/signin-signup.ejs');
app.set('view engine' , 'ejs');

// Routes

app.get('/' , (req , res) => {
    // res.send("This is the home page // Under Construction");
    console.log("Someone has visited the home page");
    fs.readFile('src/pages/home-page/index.ejs' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data || 'no data');
        return res.end();
    })
})

app.get('/login' , (req , res) => {
    fs.readFile('src/pages/login/signin-signup.ejs' , function(err , data){
        if(err) console.log(err)
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.get('/protected' , isloggedIn , (req , res) => {
    fs.readFile('src/pages/user-profile/user.ejs' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

// Session Logout

app.get('/user/logout' , (req , res) => {
    req.logout();
    req.session.destroy();
    res.send("User has been logged out");
    console.log("User has been logged out");
})

// Scope

app.get('/auth/google' , passport.authenticate('google' , { scope : ['profile' , 'email'] }));

app.get('/google/callback' , passport.authenticate('google' , {
    successRedirect: '/protected' ,
    failureRedirect: '/auth/faliure'
}))

app.get('/auth/failure' , isloggedIn , (req , res) => {
    res.send("<h1>There has been some error while you were logging in. Please wait some time and try again later!</h1>");
})

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
})
