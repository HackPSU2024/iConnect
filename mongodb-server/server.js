// async function run() {
//   try {
//     // Connect the client to the server	(optional starting in v4.7)
//     await client.connect();
//     // Send a ping to confirm a successful connection
//     await client.db("admin").command({ ping: 1 });
//     console.log("Pinged your deployment. You successfully connected to MongoDB!");
//    } finally {
//     // Ensures that the client will close when you finish/error
//     await client.close();
//   }
// }
// run().catch(console.dir);


// server.js

const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;

// MongoDB connection URI
const uri = "mongodb+srv://jrt5617:5YaEePvrumVGysnI@iconnectdb.mdjuvtf.mongodb.net/?retryWrites=true&w=majority&appName=iConnectDB";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectToMongoDB() {
  try {
    await client.connect();
    console.log("Connected to MongoDB!");
  } catch (err) {
    console.error("Failed to connect to MongoDB:", err);
  }
}

connectToMongoDB();

// Example route to fetch data from MongoDB
app.get('/api/data', async (req, res) => {
   console.log("/api/data request");
  try {
    const db = client.db("iConnectDB");
    const collection = db.collection("cards");
    const data = await collection.find({}).toArray();
    console.log(data);
    res.json(data);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

