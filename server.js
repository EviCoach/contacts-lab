const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const contacts = require('./routes/contacts');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 3000;

// configure the mongoose && mongodb section
const uri = process.env.ATLAS_URI;
try {
    mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
} catch (err) {
    console.log(`Error connecting to database: ${err}`);
}

const connection = mongoose.connection;
connection.once('open', () => {
    console.log('MongoDB database connection established successfully');
});

app.use('/contacts', contacts);



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
})