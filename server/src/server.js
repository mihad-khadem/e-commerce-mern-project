const express = require('express')
const app = express();
const port = process.env.PORT || 3001;
const morgan = require('morgan');



//! Middlewares

app.use(morgan('dev'));



//! Testing for API health 
app.get('/test', (req, res) => {
    res.status(200).send({ message: 'working fine'});
})


app.get('/',(req, res) => {
    res.status(200).send({message : "Server running..."});
})

app.listen(port, ()=> {
    console.log(`listening on ${port}`);
})