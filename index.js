const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const ObjectId = require("mongodb").ObjectID;
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

client.connect((err) => {
    const visaCollection = client.db(process.env.DB_NAME).collection("visas");
    const reviewCollection = client
        .db(process.env.DB_NAME)
        .collection("reviews");
    const adminCollection = client.db(process.env.DB_NAME).collection("admins");
    const orderCollection = client.db(process.env.DB_NAME).collection("orders");
    console.log("db connected");

    app.post("/addService", (req, res) => {
        const { detail, price, serviceName, imageURL } = req.body;
        const visaService = { detail, price, serviceName, imageURL };
        visaCollection.insertOne(visaService).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });

    app.post("/giveReview", (req, res) => {
        const { name, profession, feedback, imgURL } = req.body;
        const review = { name, profession, feedback, imgURL };
        reviewCollection.insertOne(review).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });

    app.post("/makeAdmin", (req, res) => {
        const { email } = req.body;
        const admin = { email };
        adminCollection.insertOne(admin).then((result) => {
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

        adminCollection.find({ email: email }).toArray((err, documents) => {
            res.send(documents);
        });
    });

    app.get("/service/:id", (req, res) => {
        const id = ObjectId(req.params.id);
        visaCollection.find({ _id: id }).toArray((err, documents) => {
            res.send(documents);
        });
    });

    app.get("/service", (req, res) => {
        const serviceName = req.query.serviceName;
        visaCollection
            .find({ serviceName: serviceName })
            .toArray((err, documents) => {
                res.send(documents);
            });
    });

    app.get("/bookings/:email", (req, res) => {
        const email = req.params.email;
        adminCollection.find({ email: email }).toArray((err, documents) => {
            if (documents[0]) {
                orderCollection.find({}).toArray((err, documents) => {
                    res.send(documents);
                });
            } else {
                orderCollection
                    .find({ email: email })
                    .toArray((err, documents) => {
                        res.send(documents);
                    });
            }
        });
    });

    app.post("/placeOrder", (req, res) => {
        const orderDetail = req.body;
        orderCollection.insertOne(orderDetail).then((result) => {
            res.send(result.insertedCount > 0);
        });
    });

    app.patch("/updateOrder/:id", (req, res) => {
        orderCollection
            .updateOne(
                { _id: ObjectId(req.params.id) },
                {
                    $set: { status: req.body.status },
                }
            )
            .then((result) => {
                res.send(result.modifiedCount > 0);
                console.log(result);
            });
    });

    app.delete("/deleteService/:_id", (req, res) => {
        const _id = ObjectId(req.params._id);
        console.log(_id);
        visaCollection.deleteOne({ _id: _id }).then((result) => {
            console.log(result.deletedCount);
            res.send(result.deletedCount > 0);
        });
    });
});

app.get("/", (req, res) => {
    res.send("Hello World!");
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
