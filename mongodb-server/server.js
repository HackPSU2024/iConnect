const express = require('express');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = 5000;
const bodyParser = require('body-parser'); // Import body-parser middleware
app.use(express.json()); // Parse JSON bodies
app.use(bodyParser.urlencoded({ extended: true }));

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
    res.json(data);
  } catch (err) {
    console.error("Error fetching data from MongoDB:", err);
    res.status(500).json({ error: "Failed to fetch data" });
  }
});

app.post('/api/send', async (req, res) => {
   console.log("/api/send called");
   try {
      const db = client.db("iConnectDB");
      const collection = db.collection("cards");

      console.log(req);
      const data = req.body;
      
      // console.log("collection: \n", collection)
      console.log("data: \n",data);
      // Inserting a single document
      const result = await collection.insertOne(data);
      // const result = await collection.insertMany(data);

      console.log("Data inserted:", result);
      res.status(200).json({ message: "Data inserted successfully" });
   } catch (err) {
      console.error("Error inserting data into MongoDB:", err);
      res.status(500).json({ error: "Failed to insert data" });
   }
})


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

