import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import kafka from "kafka-node";
import { ArticleImg } from "./models/imageModel.js";

const app = express();
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

app.use(cors());

const CONNECTION_URL = "mongodb://localhost:27017/image";
const PORT = 5002;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const consumer = new kafka.Consumer(
  kafkaClient,
  [{ topic: "img", partition: 0 }],
  { autoCommit: true }
);
consumer.on("message", async (message) => {
  const { primaryId, imgName, imgPath } = JSON.parse(message.value);

  console.log("Message received from Kafka:", { primaryId, imgName, imgPath });

  // Store the name in the database
  try {
    const articleImg = new ArticleImg({ primaryId, imgName, imgPath });
    await articleImg.save();
    console.log("Article image saved to database");
  } catch (error) {
    console.log("Article image saved error", error);
  }
});
consumer.on("error", (error) => {
  console.error("Error in Kafka consumer:", error);
});

app.get('/images', async (req, res) => {
  try {
    const images = await ArticleImg.find();
    res.status(200).json(images);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

