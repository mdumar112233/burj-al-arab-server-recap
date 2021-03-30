const express = require('express')
const app = express()
const port = process.env.PORT ||  5000;
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config()
const MongoClient = require('mongodb').MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.ij0ac.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})



client.connect(err => {
  const bookingCollection = client.db("burj-al-arab-re-practice").collection("bookings");

  app.post('/addBooking', (req, res) => {
    const newBooking = req.body;
    console.log(newBooking);
    bookingCollection.insertOne(newBooking)
    .then(result => {
      res.send(result.insertedCount > 0)
    })
  })

  app.get('/bookings', (req, res) => {
    const query = req.query.email;
    bookingCollection.find({email: query})
    .toArray((err, documents) => {
      res.send(documents)
    })
  })

});


app.listen(port)



















