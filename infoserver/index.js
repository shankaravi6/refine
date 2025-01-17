import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import kafka from "kafka-node";
import { ArticleInfo } from "./model/articleModel.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const CONNECTION_URL = "mongodb://localhost:27017/info";
const PORT = 5001;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(
  kafkaClient,
  [{ topic: "info", partition: 0 }],
  { autoCommit: true }
);
consumer.on("message", async (message) => {
  const { primaryId, shortTitle, title, shortDesc, LongDesc, category, author } =
    JSON.parse(message.value);

  console.log("Message received from Kafka:", {
    primaryId,
    title,
    shortDesc,
    LongDesc,
    category,
    author,
  });
  // Store the name in the database
  try {
    const articleInfo = new ArticleInfo({
      primaryId,
      title,
      shortTitle,
      shortDesc,
      LongDesc,
      category,
      author,
    });
    await articleInfo.save();
    console.log("Article Info saved to database");
  } catch (error) {
    console.log("ArticleInfo saved error", error);
  }
});
consumer.on("error", (error) => {
  console.error("Error in Kafka consumer:", error);
});

app.get('/info', async (req, res) => {
  try {
    const articles = await ArticleInfo.find();
    res.status(200).json(articles);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

