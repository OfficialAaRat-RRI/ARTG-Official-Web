const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');

app.set('view engine' , 'ejs');

// Pages
app.set('./pages')
app.set('login' , './pages/login.ejs');

app.get('/' , (req , res) => {
    res.send("This is the home page // Under Construction");
})

app.get('/login' , (req , res) => {
    console.log("Someone has come to the home page.");
    fs.readFile('./pages/home-page/index.ejs' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
})