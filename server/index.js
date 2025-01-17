import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import kafka from "kafka-node";
import { User } from "./model/userModel.js";
import multer from 'multer';
import path, { dirname } from "path";
import { fileURLToPath } from "url";
import axios from 'axios';

const app = express();
dotenv.config();

app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));


const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "public", "assets", "images", "article"));
  },
  filename: function (req, file, cb) {
    cb(null, "Silo_Article_" + file.originalname);
  },
});

const upload = multer({ storage: storage });

app.use(cors());
app.use(express.static(path.join(__dirname, "public")));

const CONNECTION_URL = "mongodb://localhost:27017/main";
const PORT = process.env.PORT || 5000;

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() =>
    app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))
  )
  .catch((error) => console.log(error.message));

const kafkaClient = new kafka.KafkaClient({ kafkaHost: "localhost:9092" });
const producer = new kafka.Producer(kafkaClient);
producer.on("ready", () => {
  console.log("Kafka Producer is connected and ready.");
});
producer.on("error", (error) => {
  console.error("Error in Kafka producer:", error);
});



app.post("/create", upload.single("image"),  async (req, res) => {
  console.log("req body", req.body);

  const generateUniquePrimaryId = () => {
    return "Silo" + Math.floor(1000 + Math.random() * 9000);
  };

  const primaryId = generateUniquePrimaryId();


  const { title, shortTitle, shortDesc, LongDesc, category, author } = req.body;

  const imgName = req.file.filename;
  const imgPath = `/assets/images/article/${imgName}`;

  // Produce a message to Kafka
  const payloadInfo = [
    {
      topic: "info",
      messages: JSON.stringify({
        primaryId,
        title,
        shortTitle,
        shortDesc,
        LongDesc,
        category,
        author,
      }),
    },
  ];

  producer.send(payloadInfo, (err, data) => {
    if (err) {
      console.error("Error sending message to Kafka:", err);
    } else {
      console.log("Message sent to Kafka:", data);
    }
  });

  const payloadImg = [
    { topic: "img", messages: JSON.stringify({ primaryId, imgName, imgPath }) },
  ];

  producer.send(payloadImg, (err, data) => {
    if (err) {
      console.error("Error sending message to Kafka:", err);
    } else {
      console.log("Message sent to Kafka:", data);
    }
  });

  res.status(201).send("Article created successfully");
});


app.get('/getarticle', async (req, res) => {
  try {
    const articlesResponse = await axios.get('http://localhost:5001/info');
    const imagesResponse = await axios.get('http://localhost:5002/images');
    
    const articles = articlesResponse.data;
    const images = imagesResponse.data;

    // Combine articles and images based on primaryId
    const combinedData = articles.map(article => {
      const image = images.find(img => img.primaryId === article.primaryId);
      return {
        _id: article._id,
        primaryId: article.primaryId,
        title: article.title,
        shortTitle: article.shortTitle,
        shortDesc: article.shortDesc,
        LongDesc: article.LongDesc,
        category: article.category,
        author: article.author,
        date: article.date,
        imgName: image ? image.imgName : null,
        imgPath: image ? image.imgPath : null,
      };
    });

    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching articles and images:", error);
    res.status(500).json({ message: "Error fetching articles and images" });
  }
});

app.post('/getsinglearticle', async (req, res) => {
  try {
    const { primaryId } = req.body;  // Get primaryId from the request body

    if (!primaryId) {
      return res.status(400).json({ message: "primaryId is required" });
    }

    // Fetch article and image data
    const articlesResponse = await axios.get('http://localhost:5001/info');
    const imagesResponse = await axios.get('http://localhost:5002/images');
    
    const articles = articlesResponse.data;
    const images = imagesResponse.data;

    // Find the article and its corresponding image
    const article = articles.find(article => article.primaryId === primaryId);
    const image = images.find(img => img.primaryId === primaryId);

    if (!article) {
      return res.status(404).json({ message: "Article not found" });
    }

    // Combine article data with image
    const combinedData = {
      _id: article._id,
      primaryId: article.primaryId,
      title: article.title,
      shortDesc: article.shortDesc,
      LongDesc: article.LongDesc,
      category: article.category,
      author: article.author,
      date: article.date,
      imgName: image ? image.imgName : null,
      imgPath: image ? image.imgPath : null,
    };

    // Send the response with the combined article and image data
    res.status(200).json(combinedData);
  } catch (error) {
    console.error("Error fetching article and image:", error);
    res.status(500).json({ message: "Error fetching article and image" });
  }
});

