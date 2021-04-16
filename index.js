const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectID = require("mongodb").ObjectID;
const port = 5000;
require("dotenv").config();
const MongoClient = require("mongodb").MongoClient;
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.hwuiv.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(bodyParser.json());
app.use(express.json());

console.log(process.env.DB_NAME);
console.log(process.env.DB_USER);
console.log(process.env.DB_PASS);

client.connect((err) => {
    const visaCollection = client.db(process.env.DB_NAME).collection("visas");
    const reviewCollection = client
        .db(process.env.DB_NAME)
        .collection("reviews");
    const adminCollection = client.db(process.env.DB_NAME).collection("admins");
    console.log("db connected");
    console.log(uri);

    app.post("/addService", (req, res) => {
        console.log(req.body);
        const { detail, price, serviceName, imageURL } = req.body;
        const visaService = { detail, price, serviceName, imageURL };
        visaCollection.insertOne(visaService).then((result) => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0);
        });
    });

    app.post("/giveReview", (req, res) => {
        console.log(req.body);
        const { name, profession, feedback, imgURL } = req.body;
        const review = { name, profession, feedback, imgURL };
        reviewCollection.insertOne(review).then((result) => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0);
        });
    });

    app.post("/makeAdmin", (req, res) => {
        console.log(req.body);
        const { email } = req.body;
        const admin = { email };
        adminCollection.insertOne(admin).then((result) => {
            console.log(result.insertedCount);
            res.send(result.insertedCount > 0);
        });
    });

    app.get("/services", (req, res) => {
        visaCollection.find({}).toArray((err, documents) => {
            res.send(documents);
        });
    });

    app.get("/reviews", (req, res) => {
        reviewCollection.find({}).toArray((err, documents) => {
            res.send(documents);
        });
    });

    app.get("/checkIfAdmin", (req, res) => {
        const email = req.query.email;
        console.log(email);
        adminCollection.find({ email: email }).toArray((err, documents) => {
            console.log(documents);
            res.send(documents);
        });
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
