const express = require('express');
const app = express();
const port = 3000;

const path = require('path');
const fs = require('fs');

app.set('view engine' , 'ejs');

app.get('./' , (req , res) => {
    res.send("This is the home page // Under Construction");
})

app.get('/login' , (req , res) => {
    fs.readFile('pages/index.html' , function(err , data){
        res.writeHead(200 , {'Content-Type' : 'text/html'});
        res.write(data);
        return res.end();
    })
})

app.listen(port , () => {
    console.log(`Server is listening on port ${port}`);
})