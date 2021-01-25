const express = require('express');
const cors = require('cors');
const path = require('path');

require('dotenv').config();

//express and port set
const app=express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());

//route
const weatherRouter = require('./routes/weatherRouter');

app.use('/weather', weatherRouter);

//build and use for production
if(process.env.NODE_ENV === 'production'){
    //set static folder
    app.use(express.static('weather-client/build'));
}
app.get('*',(req, res) => {
    res.sendFile(path.resolve(__dirname, 'weather-client/build', 'index.html'));
});

//listen on port
app.listen(PORT, () => {
    console.log('Server is running on port: ' + PORT);
});