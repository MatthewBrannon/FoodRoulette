/*
Hello World Test
const express = require("express")

var app = express()
app.get("/",function(request,response){
    response.send("Hello World")
})

app.listen(10000, function () {
    console.log("Started application on post %d", 10000)
})*/

const express = require('express');
const { MongoClient } = require('mongodb');
const app = express();
const port = 3000;

const uri = 'your-mongodb-connection-string';
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(express.static('public'));

app.get('/start-roulette', async (req, res) => {
    try {
        await client.connect();
        const database = client.db('foodRouletteDB');
        const collection = database.collection('foods');
        const food = await collection.aggregate([{ $sample: { size: 1 } }]).toArray();
        res.send(food);
    } catch (error) {
        console.error(error);
        res.status(500).send('Error connecting to the database');
    } finally {
        await client.close();
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
/*
// server.mjs
import { createServer } from 'node:http';

const server = createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello World!\n');
});

// starts a simple http server locally on port 3000
server.listen(3000, '127.0.0.1', () => {
  console.log('Listening on 127.0.0.1:3000');
});

// run with `node server.mjs`
*/