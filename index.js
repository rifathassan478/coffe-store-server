const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.CDB_USERNAME}:${process.env.CDB_PASSWORD}@coffe.igpzjgh.mongodb.net/?retryWrites=true&w=majority&appName=Coffe`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    const coffeCollection = client.db('coffeeDB').collection('coffees');

    // Insert a coffee in the database
    app.post('/coffee', async (req, res) => {
      const coffee = req.body;
      const result = await coffeCollection.insertOne(coffee);
      res.send(result);
    });

    // Get all coffees from db
    app.get('/coffees', async (req, res) => {
      const coffeList = await coffeCollection.find().toArray();
      res.send(coffeList);
    });

    // Update a coffe in db
    app.put('/coffee/:id', async (req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      const coffee = req.body;
      const options = { upsert: true };
      const updateCoffee = {
        $set: coffee,
      };

      const result = await myColl.updateOne(filter, updateDocument);
      res.send(result);
    });

    // Delete a coffee from db
    app.delete('/coffe/:id', async (req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      const result = await coffeCollection.deleteOne(id);
      res.send(result);
    });

    //Get a single coffee by id
    app.get('/coffee/:id', async (req, res) => {
      const id = { _id: new ObjectId(req.params.id) };
      const coffee = await coffeCollection.findOne(id);
      res.send(coffee);
    });
    
  } finally {
    console.log('MongoDB connection established');
    // Ensures that the client will close when you finish/error
    // await client.close();
  }
}

run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Want some coffee server is running!');
});

app.listen(port, () => {
  console.log(`Coffe server is running ${port}`);
});
