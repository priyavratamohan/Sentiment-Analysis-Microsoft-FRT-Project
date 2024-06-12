const express = require('express');
const { TextAnalysisClient, AzureKeyCredential } = require("@azure/ai-language-text");
const { CosmosClient } = require("@azure/cosmos");
require("dotenv").config();

const app = express();
const port = 3000;

const endpoint = process.env["ENDPOINT"];
const apiKey = process.env["LANGUAGE_API_KEY"];

const cosmosEndpoint = process.env["COSMOS_DB_ENDPOINT"];
const cosmosKey = process.env["COSMOS_DB_KEY"];
const cosmosDatabase = process.env["COSMOS_DB_DATABASE"];
const cosmosContainer = process.env["COSMOS_DB_CONTAINER"];

const client = new TextAnalysisClient(endpoint, new AzureKeyCredential(apiKey));
const cosmosClient = new CosmosClient({ endpoint: cosmosEndpoint, key: cosmosKey });
const container = cosmosClient.database(cosmosDatabase).container(cosmosContainer);

app.use(express.json());
app.use(express.static('public')); // Serve static files from the "public" directory

// Serve the HTML file for the root route
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});

// API endpoint for sentiment analysis
app.post('/analyze', async (req, res) => {
  const { documents } = req.body;

  try {
    const results = await client.analyze("SentimentAnalysis", documents);
    res.json(results);
  } catch (err) {
    console.error("Error analyzing sentiment:", err);
    res.status(500).send("Error analyzing sentiment");
  }
});

// API endpoint to add a new input
app.post('/inputs', async (req, res) => {
  const { input } = req.body;
  try {
    const { resource: createdItem } = await container.items.create({ input, timestamp: new Date().toISOString() });
    res.status(201).json(createdItem);
  } catch (err) {
    console.error("Error adding input:", err);
    res.status(500).send("Error adding input");
  }
});

// API endpoint to get the last 5 inputs
app.get('/inputs', async (req, res) => {
  try {
    const { resources: items } = await container.items
      .query("SELECT * FROM c ORDER BY c.timestamp DESC")
      .fetchAll();
    res.json(items);
  } catch (err) {
    console.error("Error fetching inputs:", err);
    res.status(500).send("Error fetching inputs");
  }
});

// API endpoint to delete a single input
app.delete('/inputs/:id', async (req, res) => {
  const { id } = req.params;
  try {
    await container.item(id, id).delete(); // Pass partition key value as second parameter
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting input:", err);
    res.status(500).send("Error deleting input");
  }
});

// API endpoint to delete all inputs
app.delete('/inputs', async (req, res) => {
  try {
    const { resources: items } = await container.items.query("SELECT c.id, c.timestamp FROM c").fetchAll();
    const deletePromises = items.map(item => container.item(item.id, item.timestamp).delete()); // Pass partition key value as second parameter
    await Promise.all(deletePromises);
    res.status(204).send();
  } catch (err) {
    console.error("Error deleting all inputs:", err);
    res.status(500).send("Error deleting all inputs");
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
